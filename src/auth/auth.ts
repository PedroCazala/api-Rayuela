import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model";

import { CartsServices } from "../services/carts.services";

import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
const secretKey = process.env.JWT_SECRET;

passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const creationDate = new Date();
                const user = await UserModel.create({
                    email,
                    password,
                    creationDate,
                });
                const createCart = await CartsServices.create(user._id);

                const completeUser = await UserModel.findByIdAndUpdate(
                    user._id,
                    { $set: { cartId: createCart._id } },
                    { new: true }
                );

                if (completeUser) return done(null, completeUser);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "user not found" });
                }
                const validate = await user.IsValidPassword(password);
                if (!validate) {
                    return done(null, false, {
                        message: "The password is wro ng",
                    });
                }

                return done(null, user, { message: "Login successful" });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use("jwt",
    new JWTStrategy(
        {
            secretOrKey: secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null,token.user)
            } catch (error) {
                return done(error);
            }
        }
    )
);

export { passport };