import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ytdl from 'ytdl-core'
export default class HomeController {
  public async index({ view }: HttpContextContract) {
    return view.render('home/index')
  }

  public async video({ response }: HttpContextContract) {
    const link = 'https://www.youtube.com/watch?v=MbUIY7RXi_E'
    // const link = 'https://www.youtube.com/watch?v=jU_fqrO7aHc'
    return response.stream(ytdl(link))
  }
}
