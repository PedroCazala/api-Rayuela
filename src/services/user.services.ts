import { UserDaoMongo } from "../daos/user.dao.mongo";

export class UserService {
    static async getOneUserById(idUser: string) {
        const user = await UserDaoMongo.getOneById(idUser);

        return user;
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
