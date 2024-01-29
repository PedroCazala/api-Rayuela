import { Request, Response } from "express";
import { UserService } from "../services/user.services";

export class UserController {
    static async getOneUser(req:Request,res:Response){
        const {idUser}= req.params
        try {
            const user = await UserService.getOneUserById(idUser)
            res.json(user)
            
        } catch (error) {
            res.json(error)
        }

    }
    static async UpdateUser(req:Request,res:Response){
        const {idUser}= req.params
        const newInfo = req.body
        // console.log('info update user',idUser,newInfo);
        try {
            const user = await UserService.UpdateUser(idUser,newInfo)
            res.json(user)
            
        } catch (error) {
            res.json(error)
        }
    }
    
}