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
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_services_1 = require("../services/user.services");
const user_controller_1 = require("../controllers/user.controller");
const auth_google_1 = require("../auth/auth-google");
const UserRoutes = express_1.default.Router();
exports.UserRoutes = UserRoutes;
const secretKey = process.env.JWT_SECRET;
UserRoutes.get("/profile", auth_1.passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const sendUser = yield user_services_1.UserService.getOneUserById(user._id);
    const selectedUserInfo = {
        name: sendUser === null || sendUser === void 0 ? void 0 : sendUser.name,
        _id: sendUser === null || sendUser === void 0 ? void 0 : sendUser._id,
        email: sendUser === null || sendUser === void 0 ? void 0 : sendUser.email,
        lastName: sendUser === null || sendUser === void 0 ? void 0 : sendUser.lastName,
        cartId: sendUser === null || sendUser === void 0 ? void 0 : sendUser.cartId,
        rol: sendUser === null || sendUser === void 0 ? void 0 : sendUser.rol,
        phone: (sendUser === null || sendUser === void 0 ? void 0 : sendUser.phone) || 0,
        img: sendUser === null || sendUser === void 0 ? void 0 : sendUser.img,
        direction: (sendUser === null || sendUser === void 0 ? void 0 : sendUser.direction) || {},
    };
    res.status(200).json({
        message: "signup successful",
        user: req.user,
        token: req.query.secret_token,
        selectedUserInfo,
    });
}));
// UserRoutes.get('/logout',(req,res)=>{
//     res.send('cerrar sesion')
// })
UserRoutes.post("/signup", auth_1.passport.authenticate("signup", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const info = req.body;
        res.status(200).json({
            message: "signup successful",
            user: req.user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Not can't signup",
            user: req.user,
        });
    }
}));
UserRoutes.get("/google", auth_google_1.passportGoogle.authenticate("google-auth", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
}), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                return next(error);
            const body = {
                _id: user._id,
                email: user.email,
                rol: user.rol,
            };
            const token = jsonwebtoken_1.default.sign({ user: body }, secretKey);
            // return res.json({ token });
            res.redirect(`${process.env.FRONTEND_URL}/loginGoogle/${token}`);
        }));
    }
    else {
        res.send('no existe el usuario');
    }
    // console.log({ message: "hola passport google", user: user });
    // res.send({ message: "hola passport google", user: user });
    // try {
    //     // const info = req.body;
    //     res.status(200).json({
    //         message: "signup successful",
    //         user: req.user,
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         message: "Not can't signup",
    //         user: req.user,
    //     });
    // }
}));
UserRoutes.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    auth_1.passport.authenticate("login", function (error, user /* ,info:any */) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (error || !user) {
                    const error = new Error("new Error");
                    return next(error);
                }
                req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return next(error);
                    const body = {
                        _id: user._id,
                        email: user.email,
                        rol: user.rol,
                    };
                    const token = jsonwebtoken_1.default.sign({ user: body }, secretKey);
                    return res.json({ token });
                }));
            }
            catch (error) {
                return next(error);
            }
        });
    })(req, res, next);
}));
UserRoutes.put("/update-user/:idUser", auth_1.passport.authenticate("jwt", { session: false }), (req, res) => {
    user_controller_1.UserController.UpdateUser(req, res);
    // return user
    // console.log('entrooo bien pepe')
    // res.json('entrooo bien pepe')
});
