// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {

    public async changePassword({ auth, request, response }) {

        const {id} = await auth.use('api').authenticate(); // returns user
        const {oldPassword, newPassword} = request.all();
        const user = await User.find(id)
        if(!user){
            return response.json({
                success: false,
                message: "User not found" 
            })
        }
        
        try {
            if(!(await Hash.verify(user.password, oldPassword))){
                return response.json({
                    success: false,
                    message: "Incorrect Old Password"
                });
            }      
            user.password = newPassword;
            await user.save();      
            return response.json({
                success: true,
                message: "Password Changed Successfully"
            });
            
        } catch (error) {
            return response.json({
                success: false,
                message: "Couldn't Change Password, try again",
                error
            });
        }
       
        // const {user} = auth.use('api') // isLoggedIn, isGuest, authenticationAttempted, isAuthenticated, user

    }

}
