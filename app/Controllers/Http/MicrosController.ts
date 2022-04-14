import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class MicrosController {
  public async index({ view }: HttpContextContract) {
    return view.render('micros/index')
  }
}
