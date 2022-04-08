import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import PinValidator from 'App/Validators/PinValidator'
import Track from 'App/Models/Track'

export default class DisplayController {
  public async index({ inertia, request, response, auth }: HttpContextContract) {
      const track = await Track.first()
      return inertia.render('Display/Index', { track })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PinValidator)

    const room = await Room.findOrFail(payload.pin)

    if (room.userId) {
      await auth.loginViaId(room.userId)
    }

    response.redirect().toRoute('display.index')
  }
}
