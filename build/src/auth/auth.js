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
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_local_1 = require("passport-local");
const user_model_1 = require("../models/user.model");
const carts_services_1 = require("../services/carts.services");
const passport_jwt_1 = require("passport-jwt");
const secretKey = process.env.JWT_SECRET;
passport_1.default.use("signup", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastName } = req.body;
        const creationDate = new Date();
        const user = yield user_model_1.UserModel.create({
            email,
            password,
            creationDate,
            name,
            lastName,
            rol: "user",
        });
        const createCart = yield carts_services_1.CartsServices.create(user._id);
        const completeUser = yield user_model_1.UserModel.findByIdAndUpdate(user._id, { $set: { cartId: createCart._id } }, { new: true });
        if (completeUser)
            return done(null, completeUser);
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.use("login", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: "user not found" });
        }
        const validate = yield user.IsValidPassword(password);
        if (!validate) {
            return done(null, false, {
                message: "The password is wro ng",
            });
        }
        return done(null, user, { message: "Login successful" });
    }
    catch (error) {
        return done(error);
    }
})));
if (secretKey) {
    passport_1.default.use("jwt", new passport_jwt_1.Strategy({
        secretOrKey: secretKey,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return done(null, token.user);
        }
        catch (error) {
            return done(error);
        }
    })));
    passport_1.default.use("jwt-admin", new passport_jwt_1.Strategy({
        secretOrKey: secretKey,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (token.user.rol === "admin") {
                return done(null, token.user);
            }
            else {
                // El usuario no es un administrador
                return done(null, false);
            }
        }
        catch (error) {
            return done(error);
        }
    })));
}
