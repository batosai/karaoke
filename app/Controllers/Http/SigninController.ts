import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

/**
 * Handle user login and logout requests.
 */
export default class SigninController {
  /**
   * Show form to login
   */
  public async create({ view, request }: HttpContextContract) {
    return view.render('auth/signin', {
      redirectTo: request.input('redirect_to', '/admin')
    })
  }

  /**
   * Handle login form submissions
   */
  public async store({
    request,
    response,
    auth,
    session,
    i18n,
  }: HttpContextContract) {
    await auth.attempt(
      request.input('email'),
      request.input('password'),
      request.input('remember_me'),
    )

    auth.user!.lastLoginAt = DateTime.local()
    await auth.user!.save()

    if (auth.user?.blocked) {
      session.flash(
        'auth.blocked',
        i18n.formatMessage('auth.E_INVALID_BLOCKED'),
      )
      session.clear()
      return response.redirect('/signin')
    }

    console.log(request.input('redirect_to', '/admin'))

    /**
     * Redirect to the home page
     */
    response.redirect(request.input('redirect_to', '/admin'))
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, request, response }: HttpContextContract) {
    await auth.logout()
    response.redirect(request.input('redirect_to', '/admin'))
  }
}
