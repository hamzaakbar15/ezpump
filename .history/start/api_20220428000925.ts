import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/Api/AuthController'
import UsersController from 'App/Controllers/Http/Api/UsersController';

const auth = new AuthController();
const user = new UsersController();

Route.group(()=>{

    Route.group(()=>{

        Route.post('register', auth.register)
        Route.post('login', auth.login)
        Route.post('forget-password', auth.forgetPassword)
        Route.post('check-forget-code', auth.checkEmailVerificationCode)
        Route.post('reset-password', auth.resetPassword)
        
    }).prefix("/auth")

    Route.group(()=>{

        Route.post('change-password', user.changePassword)

    }).prefix("/user").middleware(['auth','api'])

}).prefix('/api')