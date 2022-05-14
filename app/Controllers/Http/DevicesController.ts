import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Track from 'App/Models/Track'
import I18n from '@ioc:Adonis/Addons/I18n'
export default class DevicesController {
  public async index({ inertia }: HttpContextContract) {

    return inertia.render('Devices/Index', {
      t: {
        'front.devices.next': I18n.locale(I18n.defaultLocale).formatMessage('front.devices.next'),
      }
    })
  }

  public async list({ inertia }: HttpContextContract) {

    const tracks = await Track.all()
    return inertia.render('Devices/List', {
      tracks,
      t: {
        'front.devices.confirmation': I18n.locale(I18n.defaultLocale).formatMessage('front.devices.confirmation'),
        'front.devices.cancel': I18n.locale(I18n.defaultLocale).formatMessage('front.devices.cancel'),
        'front.devices.choose': I18n.locale(I18n.defaultLocale).formatMessage('front.devices.choose'),
      }
    })
  }

  public async micro({ inertia }: HttpContextContract) {
    return inertia.render('Devices/Micro')
  }
}
