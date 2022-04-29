// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        try {
            const user = await auth.use('api').authenticate();
            if(!user) return false
            return user;
            
        } catch (error) {
            // return error
        }
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
