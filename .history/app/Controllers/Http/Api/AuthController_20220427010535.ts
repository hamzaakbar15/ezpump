// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
// import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {

    public async register({request, response}){

        // const userSchema = schema.create({
        //     email: schema.string({}, [
        //       rules.unique({ table: 'users', column: 'email' })
            
        //     ]),
        //     name: schema.string(),

        // })
        // const data = await request.validate({ schema: userSchema })
        const {email, username} = request.all()
        const check = await User.findBy('email', email);
        //check email address 
        if(check){
            return response.json({
                success: false,
                message: 'Email already exists'
            })
        }
        
        const checkUsername = await User.findBy('username', username);
        //check username
        if(checkUsername){
            return response.json({
                success: false,
                message: 'Username already exists'
            })
        }
        
        const user = await User.create(request.all())
        return response.json({
            success : true,
            user
        })
    }

    public async login({auth, request, response}){
        const {email, password} = request.all()
        // Lookup user manually
        const user = await User
        .query()
        .where('email', email)
        .first()
        
        if(!user){
            return response.json({
                success: false,
                message: 'User not found'
            })
        }

        //checking for not verified
        if(!(user.isVerified)){
            return response.json({
                success: false,
                message: 'User is not verified'
            })
        }

        //checking for inactive
        if(!(user.isActive)){
            return response.json({
                success: false,
                message: 'User is currently In Active'
            })
        }
        
        // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        try {
            const token = await auth.use('api').generate(user)           
            return response.json({
                success: true,
                token,
                user
            })
        } catch (error) {
            return response.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
    }
}
