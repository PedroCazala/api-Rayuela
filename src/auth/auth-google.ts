import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.services";
// import { CartsServices } from "../services/carts.services";

// import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
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
        async function(accessToken, refreshToken, profile, cb) {
            // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
            try {
              if(profile.emails){
                console.log('entro al if de auth-google');
                
                const user = await UserModel.find({ email: profile.emails[0].value  });
                console.log('entro al if de auth-google',user);
        
                if (user) {
                  // El usuario ya existe, lo devolvemos
                  return cb(null, user[0]);
                }
              }
              return cb(null, false);

            } catch (error) {
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
