import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/Api/AuthController'

const auth = new AuthController();

Route.post('register', auth.register)
Route.post('login', auth.login)