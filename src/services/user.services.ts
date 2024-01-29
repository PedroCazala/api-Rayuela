import { UserDaoMongo } from "../daos/user.dao.mongo";

export class UserService {
    static async getOneUserById(idUser: string) {
        const user = await UserDaoMongo.getOneById(idUser);

        return user;
    }
    static async UpdateUser(idUser: string, data: object) {
        console.log("servicio no");
        const user = await UserDaoMongo.UpdateUser(idUser, data);
        console.log("servicio", user);

        return user;
    }
    static async UpdateImgUser(idUser: string, newImg: string) {
        const user = await UserDaoMongo.UpdateImgUser(idUser, newImg);

        return user;
    }
}
