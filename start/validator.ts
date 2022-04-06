/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { DateTime } from 'luxon'
import { validator } from '@ioc:Adonis/Core/Validator'
import DisplayConnexion from 'App/Models/DisplayConnexion'

// The string must contain at least 1 lowercase alphabetical character
validator.rule('oneLowerCaseAtLeast', (value, _, options) => {
  const regex = new RegExp('(?=.*[a-z])')
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'oneLowerCaseAtLeast',
      'oneLowerCaseAtLeast validation failed',
      options.arrayExpressionPointer,
    )
  }
})

// The string must contain at least 1 uppercase alphabetical character
validator.rule('oneUpperCaseAtLeast', (value, _, options) => {
  const regex = new RegExp('(?=.*[A-Z])')
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'oneUpperCaseAtLeast',
      'The string must contain at least 1 uppercase alphabetical character',
      options.arrayExpressionPointer,
    )
  }
})

// The string must contain at least 1 numeric character
validator.rule('oneNumericAtLeast', (value, _, options) => {
  const regex = new RegExp('(?=.*[0-9])')
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'oneNumericAtLeast',
      'The string must contain at least 1 numeric character',
      options.arrayExpressionPointer,
    )
  }
})

// The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
validator.rule('oneSpecialCharacterAtLeast', (value, _, options) => {
  const regex = new RegExp('(?=.*[!@#$%^&*])')
  if (!regex.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'oneSpecialCharacterAtLeast',
      'The string must contain at least one special character',
      options.arrayExpressionPointer,
    )
  }
})

// The string is present in DisplayConnexion and not expired
validator.rule(
  'existAndNotExpired',
  async (value, _, options) => {

    const now: DateTime = DateTime.now()
    const dc: DisplayConnexion | null = await DisplayConnexion.find(value)

    if (dc) {
      const dateDiff: any = now.diff(dc!.createdAt, ['minutes']).toObject()

      if (dateDiff.minutes <= 15) {
        return
      }
    }

    options.errorReporter.report(
      options.pointer,
      'existAndNotExpired',
      'Pin expired or not exist',
      options.arrayExpressionPointer,
    )
  },
  () => {
    return {
      async: true,
      compiledOptions: {},
    }
  },
)
