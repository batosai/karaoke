import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'

export default class DevicesController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Devices/Index')
  }

  public async list({ inertia }: HttpContextContract) {

    const tracks = await Track.all()
    return inertia.render('Devices/List', { tracks })
  }

  public async micro({ inertia }: HttpContextContract) {
    return inertia.render('Devices/Micro')
  }
}
