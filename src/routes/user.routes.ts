import express from 'express'
import mongoose from 'mongoose'
import { passport } from '../auth/auth'
import jwt, { Secret } from 'jsonwebtoken'
import { UserService } from '../services/user.services'
import { IUser } from '../interfaces/users.interface'
const UserRoutes = express.Router()
const secretKey = process.env.JWT_SECRET 


UserRoutes.get('/profile',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const user = req.user as IUser;
    const completeUser = await UserService.getOneUserById(user._id as unknown as string)

    res.status(200).json({message:'signup successful',user:req.user,token: req.query.secret_token,completeUser})
})
// UserRoutes.get('/logout',(req,res)=>{
//     res.send('cerrar sesion')

// })
UserRoutes.post('/signup',passport.authenticate('signup',{session:false}),async(req,res)=>{
    try {
        res.status(200).json({message:'signup successful',user:req.user})
    } catch (error) {
        res.status(500).json({message:"Not can't signup",user:req.user})
    }
})
UserRoutes.post('/login',async (req,res,next)=>{
    passport.authenticate('login',async function(error:Error,user:any/* ,info:any */) {
        try {
            if(error || !user){
                const error = new Error('new Error')
                return next(error)
            }
            req.login(user,{session:false},async (error)=>{ 
                if (error) return next(error)
                const body = {_id:user._id,email:user.email }
                const token =jwt.sign({user:body},secretKey as Secret ) 
                return res.json({token })
            })
        } catch (error) {
            return next(error )
        }
    })(req,res,next)
})

export {UserRoutes}