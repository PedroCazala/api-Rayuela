import express from "express";
import { passport } from "../auth/auth";
import jwt, { Secret } from "jsonwebtoken";
import { UserService } from "../services/user.services";
import { IUser } from "../interfaces/users.interface";
import { UserController } from "../controllers/user.controller";
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
        console.log(sendUser, " es el log de send user");
        console.log(sendUser?.lastName, "es el nombre");
        console.log(sendUser?.email, "es el email");
        // const lala = {
        //     _id: "65a47ad9edd4629888a491a8",
        //     creationDate: "2024-01-15T00:22:49.370Z",
        //     email: "cazalapedro@hotmail.com.ar",
        //     password:
        //         "$2a$10$3HAgIQyNzAm1ceaHs01UbOWESM0U4Ufrf2mFu3S5QzZ9LLggeZ.HG",
        //     __v: 0,
        //     cartId: "65a47ad9edd4629888a491aa",
        //     rol: "user",
        //     direction: {
        //         address: "Av España 1171",
        //         city: "San Andrés de Giles",
        //         prov: "Buenos Aires",
        //         CP: 6720,
        //     },
        //     img: "https://pbs.twimg.com/profile_images/1681675523942907905/M_PF4Ifl_400x400.jpg",
        //     lastName: "Cazala Acuña",
        //     name: "Pedro Miguel",
        //     phone: 23254334345,
        // };
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
    // (req, res, next) => {
    //     // Middleware para analizar el cuerpo de la solicitud
    //     express.json()(req, res, next);
    // },
    passport.authenticate("signup", { session: false}),
    async (req, res) => {
        try {
            const info = req.body;
            console.log(info);

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

UserRoutes.put('/update-user/:idUser', passport.authenticate("jwt", { session: false }),(req, res) => {
    UserController.UpdateUser(req,res)
    // return user
    // console.log('entrooo bien pepe')
    
    // res.json('entrooo bien pepe')
})
export { UserRoutes };
