import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DisplayConnexion from 'App/Models/DisplayConnexion'
import PinValidator from 'App/Validators/PinValidator'
import Track from 'App/Models/Track'

export default class DisplayController {
  public async index({ inertia, request, response, auth }: HttpContextContract) {
      const track = await Track.first()
      return inertia.render('Display/Index', { track })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PinValidator)

    const dc = await DisplayConnexion.findOrFail(payload.pin)

    if (dc.userId) {
      await auth.loginViaId(dc.userId)
    }

    response.redirect().toRoute('display.index')
  }
}
