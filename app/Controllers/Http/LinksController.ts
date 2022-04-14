import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import PinValidator from 'App/Validators/PinValidator'
import Ws from 'App/Services/Ws'


export default class LinksController {
  public async index({ inertia, request }: HttpContextContract) {
    const pin = request.qs().pin

    return inertia.render('Links/Index', { pin })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(PinValidator)

    const room = await Room.findOrFail(payload.pin)

    room.userId = auth.user!.id
    room.save()

    Ws.io.to(room.socketId).emit('room:login')

    response.redirect().toRoute('devices')
  }
}
