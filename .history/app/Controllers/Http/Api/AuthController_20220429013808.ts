// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from "@ioc:Adonis/Addons/Mail";
import Drive from '@ioc:Adonis/Core/Drive'

// import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {

    public async register({ request, response }) {

        // const userSchema = schema.create({
        //     email: schema.string({}, [
        //       rules.unique({ table: 'users', column: 'email' })

        //     ]),
        //     name: schema.string(),

        // })
        // const data = await request.validate({ schema: userSchema })
        const { email, username } = request.all()
        const check = await User.findBy('email', email);
        //check email address 
        if (check) {
            return response.json({
                success: false,
                message: 'Email already exists'
            })
        }

        const checkUsername = await User.findBy('username', username);
        //check username
        if (checkUsername) {
            return response.json({
                success: false,
                message: 'Username already exists'
            })
        }

        const user = await User.create(request.all())
        return response.json({
            success: true,
            user
        })
    }

    public async login({ auth, request, response }) {
        const { email, password } = request.all()
        // Lookup user manually
        const user = await User.findBy('email', email)
        if (!user) {
            return response.json({
                success: false,
                message: 'User not found'
            })
        }
        const image = await Drive.get(user.cover_image)
        return image.toString();

        // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        //checking for not verified
        if (!user.isVerified) {
            return response.json({
                success: false,
                message: 'User is not verified'
            })
        }

        //checking for inactive
        if (!(user.isActive)) {
            return response.json({
                success: false,
                message: 'User is currently In Active'
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
                message: "Invalid Credentials",
            })
        }
    }

    public async forgetPassword({ request, response }) {
        const { email } = request.all();
        const user = await User.findBy('email', email)
        if (!user) {
            return response.json({
                success: false,
                message: "User doesn't exists"
            })
        }
        try {
            const code = Math.floor(Math.random() * 10000)
            await Mail.send((message) => {
                message
                    .from('mohdsaadtabani@gmail.com')
                    .to('saadmansoortabani@gmail.com')
                    .subject('EZ-Pump')
                    .htmlView('emails/forget_password', { code })
            });
            user.code = code;
            await user.save();
            return response.json({
                success: true,
                message: "Email Sent",
                user: { email, id: user.id },
                code
            })

        } catch (error) {
            return response.json({
                success: false,
                message: "Some Problem Occurred, Try Again",
            })

        }

    }
    
    public async checkEmailVerificationCode({ request, response }) {
        const { id, code } = request.all();
        const user = await User.find(id);
        if (!user) {
            return response.json({
                success: false,
                message: "User doesn't exists"
            })
        }
        if (user?.code != code) {
            return response.json({
                success: false,
                message: "Invalid Code"
            });
        }
        return response.json({
            success: true,
            message: "Email Verification Successful"
        })
    }

    public async resetPassword({ request, response }) {
        const { id, password } = request.all();
        const user = await User.find(id);
        if (!user) {
            return response.json({
                success: false,
                message: "User doesn't exists"
            })
        }
        try {
            // const hash = Hash.make(password);
            user.password = password;
            await user.save();
            // return user.password;
            return response.json({
                success: true,
                message: "Password Changed Successfully"
            })
        } catch (error) {
            return response.json({
                success: true,
                message: "Couldn't Change Password"
            })
        }

    }
}