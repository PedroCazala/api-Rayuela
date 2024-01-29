import { UserModel } from "../models/user.model";

export class UserDaoMongo {
    static async getOneById(idUser: string) {
        const user = UserModel.findById(idUser);
        return user;
    }
    static async UpdateUser(idUser: string, data: object) {
        console.log('Updating user with ID:', idUser);
        console.log('New data:', data);
        const user = await UserModel.findByIdAndUpdate(
            idUser ,
            { $set: data },
            { new: true } // Esto devuelve el documento actualizado
        );
        console.log('user',user);
        
        return user;
    }
    static async UpdateImgUser(idUser: string, newImg: string) {

        const user = await UserModel.findByIdAndUpdate(
            idUser ,
            { $set: {img:newImg} },
            { new: true } // Esto devuelve el documento actualizado
        );
        console.log('user',user);
        
        return user;
    }
}
