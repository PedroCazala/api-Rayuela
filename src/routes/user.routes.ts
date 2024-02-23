import express from "express";
import { passport } from "../auth/auth";
import jwt, { Secret } from "jsonwebtoken";
import { UserService } from "../services/user.services";
import { IUser } from "../interfaces/users.interface";
import { UserController } from "../controllers/user.controller";
import { passportGoogle } from "../auth/auth-google";
const UserRoutes = express.Router();
const secretKey = process.env.JWT_SECRET;

UserRoutes.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const user = req.user as IUser;
        const sendUser = await UserService.getOneUserById(
            user._id as unknown as string
        );

        const selectedUserInfo = {
            name: sendUser?.name,
            _id: sendUser?._id,
            email: sendUser?.email,
            lastName: sendUser?.lastName,
            cartId: sendUser?.cartId,
            rol: sendUser?.rol,
            phone: sendUser?.phone || 0,
            img: sendUser?.img,
            direction: sendUser?.direction || {},
        };

        res.status(200).json({
            message: "signup successful",
            user: req.user,
            token: req.query.secret_token,
            selectedUserInfo,
        });
    }
);
// UserRoutes.get('/logout',(req,res)=>{
//     res.send('cerrar sesion')

// })
UserRoutes.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req, res) => {
        try {
            // const info = req.body;

            res.status(200).json({
                message: "signup successful",
                user: req.user,
            });
        } catch (error) {
            res.status(500).json({
                message: "Not can't signup",
                user: req.user,
            });
        }
    }
);
UserRoutes.get(
    "/google",
    passportGoogle.authenticate("google-auth", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        session: false,
        prompt: 'consent', 
    }),
    async (req, res, next) => {
        const user = req.user as IUser;

        console.log(user);
        if (user) {
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = {
                    _id: user._id,
                    email: user.email,
                    rol: user.rol,
                };
                const token = jwt.sign({ user: body }, secretKey as Secret);
                // return res.json({ token });
                res.redirect(
                    `${process.env.FRONTEND_URL}/loginGoogle/${token}`
                );
            });
        } else {
            res.send("no existe el usuario");
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
    }
);

UserRoutes.post("/login", async (req, res, next) => {
    passport.authenticate(
        "login",
        async function (error: Error, user: any /* ,info:any */) {
            try {
                if (error || !user) {
                    const error = new Error("new Error");
                    return next(error);
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error);
                    const body = {
                        _id: user._id,
                        email: user.email,
                        rol: user.rol,
                    };
                    const token = jwt.sign({ user: body }, secretKey as Secret);
                    return res.json({ token });
                });
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
});

UserRoutes.put(
    "/update-user/:idUser",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        UserController.UpdateUser(req, res);
        // return user
        // console.log('entrooo bien pepe')

        // res.json('entrooo bien pepe')
    }
);
export { UserRoutes };
