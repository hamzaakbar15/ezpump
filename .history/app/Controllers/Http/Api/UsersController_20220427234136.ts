// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        const user = await auth.use('api').authenticate();
        return user;
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
