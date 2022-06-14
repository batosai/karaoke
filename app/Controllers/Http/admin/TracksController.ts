import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import TrackValidator from 'App/Validators/TrackValidator'
import Route from '@ioc:Adonis/Core/Route'
import ytdl from 'ytdl-core'

export default class TracksController {
  public async index({ request, view, bouncer }: HttpContextContract) {
    await bouncer.with('TrackPolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 10

    const tracks = await Track.query().paginate(page, limit)
    tracks.baseUrl(Route.builder().make('admin_tracks.index'))

    return view.render('admin/tracks/index', {
      tracks,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('TrackPolicy').authorize('create')
    return view.render('admin/tracks/create')
  }

  public async store({ request, response, bouncer, auth }: HttpContextContract) {
    await bouncer.with('TrackPolicy').authorize('create')
    const payload = await request.validate(TrackValidator)

    const track = new Track()
    await track.fill(payload)
    track.userId = auth.user!.id

    if (!track.title) {
      const meta = await ytdl.getInfo(track.url)
      track.title = meta.videoDetails.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      track.preview = meta.videoDetails.thumbnails[0].url
    }
    await track.save()

    response.redirect().toRoute('admin_tracks.index')
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const track = await Track.findOrFail(request.param('id'))
    await bouncer.with('TrackPolicy').authorize('update', track)

    return view.render('admin/tracks/edit', {
      track,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, bouncer } = ctx
    const track = await Track.findOrFail(request.param('id'))

    await bouncer.with('TrackPolicy').authorize('update', track)

    const payload = await request.validate(TrackValidator)

    await track.merge(payload)
    await track.save()

    response.redirect().toRoute('admin_tracks.index')
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const { id } = params
    const track = await Track.findOrFail(id)
    await bouncer.with('TrackPolicy').authorize('delete', track)
    await track.delete()
    response.redirect().toRoute('admin_tracks.index')
  }
}
