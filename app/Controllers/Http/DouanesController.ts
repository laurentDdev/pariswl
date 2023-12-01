// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RequestWl from 'App/Models/RequestWl'

export default class DouanesController {
  public async index({ auth, view, response }) {
    try {
      await auth.use('web').authenticate()

      if (!auth.user.douanier) {
        response.redirect('/whitelist')
      }

      const requetsWl = await RequestWl.all()

      return view.render('douane', { douanier: auth.user.douanier, requetsWl: requetsWl })
    } catch (error) {
      console.log(error)
      response.redirect('/')
    }
  }

  public async show({ auth, view, response, params }) {
    try {
      const requestId = params.id
      console.log(requestId)

      await auth.use('web').authenticate()

      if (!auth.user.douanier) {
        response.redirect('/whitelist')
      }

      const requestWl = await RequestWl.find(requestId)

      return view.render('detail', { requestWl: requestWl })
    } catch (e) {
      response.redirect('/')
      console.log(e)
    }
  }
}
