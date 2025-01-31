import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { UserModel } from "../models/user.model";
import { CartsServices } from "../services/carts.services";
import { MailService } from "../services/mails.service";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const HOST = process.env.HOST;
const passportGoogle = passport;
passportGoogle.use(
    "google-auth",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID ?? "valor-predeterminado",
            clientSecret: GOOGLE_CLIENT_SECRET ?? "valor-predeterminado",
            callbackURL: `${HOST}/api/user/google`,
        },
        async function (_accessToken, _refreshToken, profile, cb) {
            try {
                if (profile.emails) {
                    //Login

                    const user = await UserModel.findOne({
                        email: profile.emails[0].value,
                    });
                    if (user) {
                        // El usuario ya existe, lo devolvemos
                        return cb(null, user);
                    } else {
                        //SINGUP
                        const newUser = await UserModel.create({
                            email: profile.emails[0].value,
                            creationDate: new Date(),
                            rol: "user",
                            name: profile.name?.givenName || "",
                            lastName: profile.name?.familyName || "",
                            img: profile.photos ? profile.photos[0].value : "",
                        });
                        const createCart = await CartsServices.create(
                            newUser._id
                        );
                        const completeUser = await UserModel.findByIdAndUpdate(
                            newUser._id,
                            { $set: { cartId: createCart._id } },
                            { new: true }
                        );

                        await MailService.sendEmailToNewUser(newUser._id)

                        if (completeUser) return cb(null, completeUser);
                    }
                }
                return cb(null, false);
            } catch (error) {
                console.log("Error en la estrategia de google", error);

                return cb(null, false);
            }
        }
    )
);
export { passportGoogle };
