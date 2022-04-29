// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        return await auth.use('api')
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
