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
import Application from '@ioc:Adonis/Core/Application'
import './api'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/file/:image', async({response,params})=>{// where :file is file name
  return response.download(Application.publicPath(`uploads/cover-images/${params.file}`))
})

// Route.post('/testing', 'AuthController.register');