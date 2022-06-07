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
    response.header('Connection', `keep-alive`)

  //   res.writeHead(206, {
  //     'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mp4',
  //     'Connection':'keep-alive'
  // });

    // ffmpeg.ffprobe(ytdl(track.url),function(err, metadata) {
    //     let audioCodec = null
    //     let videoCodec = null
    //     console.log(metadata.streams)
    //     metadata.streams.forEach(function(stream){
    //         if (stream.codec_type === "video")
    //             videoCodec = stream.codec_name
    //         else if (stream.codec_type === "audio")
    //             audioCodec = stream.codec_name
    //     })

    //     console.log("Video codec: %s\nAudio codec: %s", videoCodec, audioCodec)
    // })


    const command = ffmpeg({ source: ytdl(track.url) })
    // const command = ffmpeg().input(ytdl(track.url, { quality: '136' }))

      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })

      // .mergeAdd(ytdl(track.url, { quality: '136' }))

      // .outputOptions(['-frag_duration 100', '-movflags frag_keyframe+empty_moov+faststart'])
      // .outputOptions(['-c:v libvpx-vp9 -row-mt 1 -threads 48 -cpu-used X -deadline good -crf X -b:v 0'])
      // .size('480x?')
      // .format('webm')
      // .videoCodec('libvpx')
      // .audioCodec('libmp3lame')
          // ok turtle
          .inputOptions('-re')
          .outputOptions(['-g 52', '-movflags frag_keyframe+empty_moov'])

          .format('mp4')
          // .videoCodec('libvpx-vp9')
          .videoCodec('libx264')
          .audioCodec('libmp3lame')

//TESTER un fichier mp4 en source
          // .ffprobe(0, function(err, data) {
          //   console.log('file1 metadata:');
          //   console.dir(data);
          // })
      // .toFormat('mp4')

      // .mergeAdd(ytdl(track.url, { quality: 'highestaudio' }))


      // .toFormat('webm')
      // .videoCodec('libvpx-vp9')
      // .audioCodec('libmp3lame')


      return response.stream(command.pipe())

    // const meta = await ytdl.getInfo(track.url)

    // const title = meta.videoDetails.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Set content headers to download stream as a file
    // response.header('content-disposition', `attachment; filename="${encodeURIComponent(title)}.mp4"`)
    // return response.stream(ytdl(track.url))


// console.log(meta)
    // return response.stream(ytdl(track.url, { quality: '136' }))
    // return response.stream(ytdl(track.url, { quality: 'highestaudio' }))
    // return response.stream(ytdl(track.url, {
    //   filter: format => format.container === 'mp4',
    // }))
  }
}
