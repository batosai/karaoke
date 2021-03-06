import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import PinValidator from 'App/Validators/PinValidator'
import I18n from '@ioc:Adonis/Addons/I18n'
export default class DisplaysController {
  public async index({ inertia }: HttpContextContract) {
      return inertia.render('Displays/Index', {
        t: {
          'front.displays.waiting': I18n.locale(I18n.defaultLocale).formatMessage('front.displays.waiting'),
        }
      })
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
