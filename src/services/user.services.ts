import { UserDaoMongo } from "../daos/user.dao.mongo";
import { IUser } from "../interfaces/users.interface";

export class UserService {
    static async getOneUserById(idUser: string) {
        const user = await UserDaoMongo.getOneById(idUser);
        return user;
    }
    static async getOneUserByEmail(email: string) {
        const user = await UserDaoMongo.getOneByEmail(email);
        return user
    }
    static async createUserFromGoogleProfile(profile:any){
        const user = await UserDaoMongo.createUserFromGoogleProfile(profile)
        return user
    }
    static async UpdateUser(idUser: string, data: object) {
        const user = await UserDaoMongo.UpdateUser(idUser, data);
        return user;
    }
    static async UpdateImgUser(idUser: string, newImg: string) {
        const user = await UserDaoMongo.UpdateImgUser(idUser, newImg);

        return user;
    }
}
