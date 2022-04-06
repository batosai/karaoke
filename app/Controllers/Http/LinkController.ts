import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DisplayConnexion from 'App/Models/DisplayConnexion'
import PinValidator from 'App/Validators/PinValidator'
import Ws from 'App/Services/Ws'


export default class LinkController {
  public async index({ inertia, request }: HttpContextContract) {
    const pin = request.qs().pin

    return inertia.render('Link/Index', { pin })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PinValidator)

    const dc = await DisplayConnexion.findOrFail(payload.pin)

    dc.userId = auth.user!.id
    dc.save()

    Ws.io.to(dc.socketId).emit('display:login')

    response.redirect().toRoute('device')
  }
}
