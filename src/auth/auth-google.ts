import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { UserModel } from "../models/user.model";
import { CartsServices } from "../services/carts.services";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const passportGoogle = passport;
passportGoogle.use(
    "google-auth",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID ?? "valor-predeterminado",
            clientSecret: GOOGLE_CLIENT_SECRET ?? "valor-predeterminado",
            callbackURL: "http://localhost:9090/api/user/google",
        },
        async function (accessToken, refreshToken, profile, cb) {
            // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
            try {
                if (profile.emails) {
                    //Login

                    console.log("entro al if de auth-google");

                    const user = await UserModel.findOne({
                        email: profile.emails[0].value,
                    })
                    console.log("entro al if de auth-google", user);

                    if (user) {
                        // El usuario ya existe, lo devolvemos
                        console.log('inteento entrar aca');
                        
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

                        if (completeUser) return cb(null, completeUser);
                    }
                }
                return cb(null, false);
            } catch (error) {
              console.log('Error en la estrategia de google',error);
              
                return cb(null, false);
            }
        }
        // async function (accessToken, refreshToken, profile, done) {
        //     console.log("jopas hola auth-google", profile.displayName);
        //     const user = profile;
        //     // return done(null,user)
        //     console.log("entro a la estrategia de google");

        //     // try {
        //     if (profile.emails !== undefined) {
        //         const user = await UserModel.findOne({
        //             email: profile.emails[0].value,
        //         });
        //         if (user) {
        //             // Usuario encontrado, devolverlo a Passport
        //             return done(null, user,  { message: "Login successful" });
        //         }
        //     }

        //     //     } else {
        //     //         // Usuario no encontrado, crea uno nuevo
        //     //         const newUser = await UserService.createUserFromGoogleProfile(profile);
        //     //         return done(null, newUser);
        //     //     }
        //     //     } else {
        //     //         // Usuario no encontrado, puedes crear uno nuevo aquí si es necesario
        //     //         // return cb(null, newUser);
        //     //         // O, si no quieres crear un usuario automáticamente, puedes indicar que el usuario no existe
        //     //         return done(null, false, { message: 'Usuario no encontrado.' });
        //     //     }
        //     // } catch (err:any) {
        //     //     // Manejar errores de base de datos u otros errores
        //     //     return done(err);
        //     // }
        // }
    )
);
export { passportGoogle };
