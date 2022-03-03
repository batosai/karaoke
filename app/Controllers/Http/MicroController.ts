import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class MicroController {
  public async index({ view }: HttpContextContract) {
    return view.render('micro/index')
  }
}
