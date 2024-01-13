import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { UserModel } from "../models/user.model";

// import { CartsServices } from "../services/carts.services";

// import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use("auth-google",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID ?? 'valor-predeterminado',
            clientSecret: GOOGLE_CLIENT_SECRET ?? 'valor-predeterminado',
            callbackURL: "http://localhost:9090/api/user/google",
        },
        async function (accessToken, refreshToken, profile, cb) {
            //Solucionar estooooooooooooooooooooooooooooooooooooooo

            
            // await UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // }); 
        }
    )
);
