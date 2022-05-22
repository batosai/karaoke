import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import ytdl from 'ytdl-core'

export default class MediasController {
  public async show({ response, request }: HttpContextContract) {
    const track = await Track.findOrFail(request.param('id'))

    return response.stream(ytdl(track.url, { filter: format => format.container === 'mp4' }))
  }
}
