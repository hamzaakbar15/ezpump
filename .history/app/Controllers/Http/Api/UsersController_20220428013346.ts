// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {

    public async updateProfile ({request, response}){
        const coverImage = request.file('cover_image');
        if (coverImage) {
            await coverImage.move(Application.tmpPath('uploads/cover-images'))
        }
    }

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
        if(!(await Hash.verify(user.password, oldPassword))){
            return response.json({
                success: false,
                message: "Incorrect Old Password"
            });
        }      
        try {
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
