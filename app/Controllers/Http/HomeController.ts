import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
export default class HomeController {
  public async index({ view, inertia }: HttpContextContract) {
    // const track = await Track.first()

    // return view.render('home/index', {
    //   track
    // })

    return inertia.render('Home/Index');
  }

  public async test({ view, inertia }: HttpContextContract) {
    const track = await Track.first()
    return inertia.render('Home/Test', { track, content: 'mon texte demo' });
  }
}
