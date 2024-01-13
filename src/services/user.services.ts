import { UserDaoMongo } from "../daos/user.dao.mongo";

export class UserService{

    static async getOneUserById(idUser:string){

        const user = await UserDaoMongo.getOneById(idUser)
        return user
    }
}