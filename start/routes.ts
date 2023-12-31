/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/my-state', 'HomeController.state').middleware('auth').as('my-state')

Route.get('/discord/redirect', 'AuthController.redirectToDiscord')
Route.get('/discord/callback', 'AuthController.handleDiscordCallback')

Route.get('/whitelist', 'WhitelistsController.index').middleware('auth')
Route.post('/submit-form', 'WhitelistsController.submitForm')

Route.get('/douane', 'DouanesController.index').middleware('auth').as('list')

Route.post('/douane/reject/:id', 'DouanesController.rejectRequest')
  .middleware('auth')
  .as('douane.reject')

Route.post('/douane/accept/:id', 'DouanesController.acceptRequest')
  .middleware('auth')
  .as('douane.accept')

Route.get('/douane/:id', 'DouanesController.show').middleware('auth').as('douane.show')



Route.get('/logout', async ({ auth, response }) => {
  await auth.logout()
  response.redirect('/')
})

// return view.render('whitelist')
