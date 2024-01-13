import { UserModel } from "../models/user.model";

export class UserDaoMongo{
    static async getOneById(idUser:string){
        const user = UserModel.findById(idUser)
        return user
    }
}