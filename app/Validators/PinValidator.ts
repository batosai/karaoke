import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PinValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    pin: schema.string([
      rules.escape(),
      rules.trim(),
      rules.existAndNotExpired(),
    ]),
  })

  public messages = {}
}
