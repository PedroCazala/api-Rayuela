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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// import { CartsServices } from "../services/carts.services";
// import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport_1.default.use("auth-google", new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID !== null && GOOGLE_CLIENT_ID !== void 0 ? GOOGLE_CLIENT_ID : 'valor-predeterminado',
    clientSecret: GOOGLE_CLIENT_SECRET !== null && GOOGLE_CLIENT_SECRET !== void 0 ? GOOGLE_CLIENT_SECRET : 'valor-predeterminado',
    callbackURL: "http://localhost:9090/api/user/google",
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        //Solucionar estooooooooooooooooooooooooooooooooooooooo
        // await UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // }); 
    });
}));
