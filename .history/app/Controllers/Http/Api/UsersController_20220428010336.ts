// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        const {id} = await auth.use('api').authenticate(); // returns user
        const {oldPassword, newPassword} = request.all();
        const user = await User.find(id)
        return user?.password
        // if(!(await Hash.verify(user?.password, oldPassword))){
        //     return response.json({
        //         success: false,
        //         message: "Incorrect Old Password"
        //     });
        // }      
        // user?.password = newPassword;
        // await user?.save();      
       
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
