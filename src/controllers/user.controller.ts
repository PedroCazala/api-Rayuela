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
}