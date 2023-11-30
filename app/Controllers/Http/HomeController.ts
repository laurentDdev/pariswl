// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ view, auth, response }) {
    try {
      await auth.use('web').authenticate()
      if (auth.use('web').isAuthenticated) {
        return response.redirect('/whitelist')
      }

    }catch (e) {
      return view.render('welcome')
    }
  }
}
