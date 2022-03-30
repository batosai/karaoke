import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'

export default class DisplayController {
  public async index({ inertia }: HttpContextContract) {

    const track = await Track.first()
    return inertia.render('Display/Index', { track })
  }
}
