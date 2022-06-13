import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import ytdl from 'ytdl-core'

export default class MediasController {
  public async show({ response, request }: HttpContextContract) {
    const track = await Track.findOrFail(request.param('id'))
    const info = await ytdl.getInfo(track.url)
    const format = ytdl.chooseFormat(info.formats, { quality: '18' })

    response.header('Content-Type', format.mimeType!)
    response.header('Content-Length', format.contentLength)
    response.header('Connection', `keep-alive`)

    return response.stream(ytdl(track.url, { quality: '18' }))
  }
}
