import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'

export default class DeviceController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Device/Index')
  }

  public async list({ inertia }: HttpContextContract) {

    const tracks = await Track.all()
    return inertia.render('Device/List', { tracks })
  }

  public async micro({ inertia }: HttpContextContract) {
    return inertia.render('Device/Micro')
  }
}
