import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TrackValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    url: schema.string({}, [
      rules.url()
    ]),
    title: schema.string.optional({ escape: true, trim: true }, []),
  })

  public messages = {}
}
