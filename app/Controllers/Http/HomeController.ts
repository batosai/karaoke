import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class HomeController {
  public async index({ view, inertia }: HttpContextContract) {
    return inertia.render('Home/Index')
  }
}
