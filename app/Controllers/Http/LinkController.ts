import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LinkController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Link/Index')
  }
}
