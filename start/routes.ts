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
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home')
Route.post('/', 'HomeController.store').as('home.store')
Route.get('/micro', 'MicrosController.index').as('micros')

Route.resource('/link', 'LinksController')
  .as('links')
  .only(['index', 'store'])
  .middleware({ '*': ['auth'] })

Route.resource('/display', 'DisplaysController')
  .as('displays')
  .only(['index', 'store'])
  .middleware({ 'index': ['auth'] })

Route.get('/device', 'DevicesController.index').as('devices')
Route.get('/device/list', 'DevicesController.list').as('devices.list')
Route.get('/device/micro', 'DevicesController.micro').as('devices.micro')

Route.resource('media', 'MediasController')
  .as('medias')
  .only(['show'])

import './routes/auth'
import './routes/admin'

Route.get('/health', async ({ response }: HttpContextContract) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
