// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RequestWl from 'App/Models/RequestWl'

export default class HomeController {
  public async index({ view, auth, response }) {
    try {
      await auth.use('web').authenticate()
      if (auth.use('web').isAuthenticated) {
        return response.redirect('/whitelist')
      }
    } catch (e) {
      return view.render('welcome')
    }
  }

  public async state({ view, auth }) {
    try {
      await auth.use('web').authenticate()

      const user = auth.user
      console.log(user.id);

      const myRequest = await RequestWl.findBy('userId', user.id)

      return view.render('mystate', {
        myRequest: myRequest
      })

    } catch (e) {
      return view.render('/')
    }
  }
}
