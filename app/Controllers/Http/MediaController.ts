import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import ytdl from 'ytdl-core'

export default class MediaController {
  public async show({ response, request }: HttpContextContract) {
    const track = await Track.findOrFail(request.param('id'))
    // const link = 'https://www.youtube.com/watch?v=MbUIY7RXi_E'
    return response.stream(ytdl(track.url))
  }
}
