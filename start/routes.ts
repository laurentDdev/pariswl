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

Route.get('/discord/redirect', 'AuthController.redirectToDiscord')
Route.get('/discord/callback', 'AuthController.handleDiscordCallback')

Route.get('/whitelist', async ({ view, ally, auth }) => {
  await auth.use('web').authenticate()
  const user = await ally.use('discord').userFromToken(auth.user?.accessToken as string)
  console.log(user.original)

  return view.render('whitelist')
}).middleware('auth')


