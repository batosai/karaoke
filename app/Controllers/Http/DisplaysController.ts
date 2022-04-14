import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import PinValidator from 'App/Validators/PinValidator'

export default class DisplaysController {
  public async index({ inertia }: HttpContextContract) {
      return inertia.render('Displays/Index')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PinValidator)

    const room = await Room.findOrFail(payload.pin)

    if (room.userId) {
      await auth.loginViaId(room.userId)
    }

    response.redirect().toRoute('displays.index')
  }
}
