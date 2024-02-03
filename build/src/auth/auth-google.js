"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportGoogle = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = require("../models/user.model");
// import { CartsServices } from "../services/carts.services";
// import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const passportGoogle = passport_1.default;
exports.passportGoogle = passportGoogle;
passportGoogle.use("google-auth", new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID !== null && GOOGLE_CLIENT_ID !== void 0 ? GOOGLE_CLIENT_ID : "valor-predeterminado",
    clientSecret: GOOGLE_CLIENT_SECRET !== null && GOOGLE_CLIENT_SECRET !== void 0 ? GOOGLE_CLIENT_SECRET : "valor-predeterminado",
    callbackURL: "http://localhost:9090/api/user/google",
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        try {
            if (profile.emails) {
                console.log('entro al if de auth-google');
                const user = yield user_model_1.UserModel.find({ email: profile.emails[0].value });
                console.log('entro al if de auth-google', user);
                if (user) {
                    // El usuario ya existe, lo devolvemos
                    return cb(null, user[0]);
                }
            }
            return cb(null, false);
        }
        catch (error) {
            return cb(null, false);
        }
    });
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
));
