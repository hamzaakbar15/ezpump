// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        await auth.use('api').authenticate()
        return auth.use('api')
        // const {} = 
    }

}
