import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Track from 'App/Models/Track'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'

export default class MediasController {
  public async show({ response, request }: HttpContextContract) {
    const track = await Track.findOrFail(request.param('id'))

    ffmpeg.setFfmpegPath(Env.get('FFMPEG_PATH'))
    // ffmpeg.setFfprobePath(Env.get('FFPROBE_PATH'))

    response.header('Content-Type', `video/mp4`)

    const command = ffmpeg({ source: ytdl(track.url, { quality: '18' }) })
      // .videoCodec('libx264')
      // .audioCodec('libmp3lame')
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })
      // .ffprobe(0, function(err, data) {
      //   console.log('file1 metadata:');
      //   console.dir(data);
      // })
      .outputOptions(['-frag_duration 100','-movflags frag_keyframe+empty_moov+faststart'])
      .toFormat('mp4')

      return response.stream(command.pipe())

//     const meta = await ytdl.getInfo(track.url)
// console.log(meta)
//     // return response.stream(ytdl(track.url, { quality: '133' }))
//     return response.stream(ytdl(track.url, {
//       filter: format => format.container === 'mp4',
//     }))
  }
}
