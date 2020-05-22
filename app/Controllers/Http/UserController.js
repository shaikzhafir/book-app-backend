'use strict'
const User = use('App/Models/User')

class UserController {


    async login({auth, request,response}){
        //retrieves from user login attempt
        const {email, password } = request.all()
        console.log(`email is ${email} and pass is ${password}`)
        // generates token based on email and password of the user
        const token = await auth.attempt(email,password)
        
        

        

        return response.json({
            status : 'login success',
            data : token
        })
    }


    show ({auth, params}){
        if (auth.user.id !== Number(params.id)){
            return "this is someone elses profile"
        }

        //else shows the user model
        return auth.user
    }

    async register({request, response,auth}){
       
        const userData = request.only(['name','username','email','password'])
        console.log(userData);
        try {
            
            // save user info to database
            const user = await User.create(userData)
            // generates auth token  
            const token = await auth.generate(user)

            Object.assign(user,token)

            return response.json({
                status : 'success',
                user : user
            })
        }

        catch(error){
            return response.status(400).json({
                status : 'error',
                message : 'error when savign user to database or gneerating token'            
            })
        }
    }

    async test({request,response}){
        console.log('asdasdasd')
        response.json({
            message : 'route works'
        })
    }
}

module.exports = UserController
