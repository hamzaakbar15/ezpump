// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        const {id} = await auth.use('api').authenticate(); // returns user
        return id
            
       
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
