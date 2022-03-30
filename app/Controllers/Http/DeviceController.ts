import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'

export default class DeviceController {
  public async index({ inertia }: HttpContextContract) {

    const tracks = await Track.all()
    return inertia.render('Device/Index', { tracks })
  }
}
