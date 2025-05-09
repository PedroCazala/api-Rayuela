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
const carts_services_1 = require("../services/carts.services");
const mails_service_1 = require("../services/mails.service");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const HOST = process.env.HOST;
const passportGoogle = passport_1.default;
exports.passportGoogle = passportGoogle;
passportGoogle.use("google-auth", new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID !== null && GOOGLE_CLIENT_ID !== void 0 ? GOOGLE_CLIENT_ID : "valor-predeterminado",
    clientSecret: GOOGLE_CLIENT_SECRET !== null && GOOGLE_CLIENT_SECRET !== void 0 ? GOOGLE_CLIENT_SECRET : "valor-predeterminado",
    callbackURL: `${HOST}/api/user/google`,
}, function (_accessToken, _refreshToken, profile, cb) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (profile.emails) {
                //Login
                const user = yield user_model_1.UserModel.findOne({
                    email: profile.emails[0].value,
                });
                if (user) {
                    // El usuario ya existe, lo devolvemos
                    return cb(null, user);
                }
                else {
                    //SINGUP
                    const newUser = yield user_model_1.UserModel.create({
                        email: profile.emails[0].value,
                        creationDate: new Date(),
                        rol: "user",
                        name: ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || "",
                        lastName: ((_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName) || "",
                        img: profile.photos ? profile.photos[0].value : "",
                    });
                    const createCart = yield carts_services_1.CartsServices.create(newUser._id);
                    const completeUser = yield user_model_1.UserModel.findByIdAndUpdate(newUser._id, { $set: { cartId: createCart._id } }, { new: true });
                    yield mails_service_1.MailService.sendEmailToNewUser(newUser._id);
                    if (completeUser)
                        return cb(null, completeUser);
                }
            }
            return cb(null, false);
        }
        catch (error) {
            console.log("Error en la estrategia de google", error);
            return cb(null, false);
        }
    });
}));
