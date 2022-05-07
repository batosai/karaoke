import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import PinValidator from 'App/Validators/PinValidator'
export default class HomeController {
  public async index({ inertia, request }: HttpContextContract) {
    const pin = request.qs().pin

    return inertia.render('Home/Index', { pin })
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(PinValidator)

    response.redirect().toRoute('devices')
  }
}
