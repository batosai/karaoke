import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
export default class HomeController {
  public async index({ view }: HttpContextContract) {
    const track = await Track.first()

    return view.render('home/index', {
      track
    })
  }
}
