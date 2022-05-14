import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PinValidator from 'App/Validators/PinValidator'
import I18n from '@ioc:Adonis/Addons/I18n'
export default class HomeController {
  public async index({ inertia, request }: HttpContextContract) {
    const pin = request.qs().pin

    return inertia.render('Home/Index', {
      pin,
      t: {
      'front.home.title': I18n.locale(I18n.defaultLocale).formatMessage('front.home.title'),
      'front.home.description': I18n.locale(I18n.defaultLocale).formatMessage('front.home.description'),
      'front.home.description2': I18n.locale(I18n.defaultLocale).formatMessage('front.home.description2'),
    }})
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(PinValidator)

    response.redirect().toRoute('devices')
  }
}
