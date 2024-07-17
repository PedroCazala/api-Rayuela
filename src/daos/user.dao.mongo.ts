import { Profile } from "passport-google-oauth20";
import { UserModel } from "../models/user.model";
import { CartsServices } from "../services/carts.services";

export class UserDaoMongo {
    static async getOneById(idUser: string) {
        const user = UserModel.findById(idUser);
        return user;
    }
    static async getOneByEmail(email: string) {
        const user = UserModel.find({email});
        return user;
    }

    static async createUserFromGoogleProfile(profile: Profile) {
        try {
            const { emails, name } = profile;
            const creationDate = new Date();
            if (emails) {
                const user = await UserModel.create({
                    email: emails[0],
                    creationDate,
                    name: name?.givenName,
                    lastName: name?.familyName,
                    rol: "user",
                });
                const createCart = await CartsServices.create(user._id);
                const completeUser = await UserModel.findByIdAndUpdate(
                    user._id,
                    { $set: { cartId: createCart._id } },
                    { new: true }
                );
                if (completeUser) return completeUser;
            }
        } catch (err) {
            return err;
        }
    }
    static async UpdateUser(idUser: string, data: object) {
        const user = await UserModel.findByIdAndUpdate(
            idUser,
            { $set: data },
            { new: true } // Esto devuelve el documento actualizado
        );

        return user;
    }
    static async UpdateImgUser(idUser: string, newImg: string) {
        const user = await UserModel.findByIdAndUpdate(
            idUser,
            { $set: { img: newImg } },
            { new: true } // Esto devuelve el documento actualizado
        );

        return user;
    }
}
