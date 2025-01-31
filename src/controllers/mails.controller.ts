import { Request, Response } from "express";
import { MailService } from "../services/mails.service";
import { OrderModel } from "../models/order.model";
import { IOrder } from "../interfaces/orders.interface";
import moment from "moment";
import ejs from "ejs";
import path from "path";
import { UserService } from "../services/user.services";

// const idOrder = "679aac0c7bacf77daa5b2ec3";
export class MailController {
    private mailService: MailService;

    constructor() {
        this.mailService = new MailService();
    }

    public async testOrderConfirmation(req: Request, res: Response) {
        const { idOrder } = req.params;

        const order: IOrder | null = await OrderModel.findById(idOrder)
            .populate("cartProducts.subProduct")
            .populate("userId")
            .exec();
        console.log("productos del carrito: ", order?.cartProducts);

        const filePath = path.join(
            __dirname,
            "../views",
            "orderConfirmation.ejs"
        );

        const html = await ejs.renderFile(filePath, { order, moment });
        res.send(html);
    }

    public async testSendEmailToAdminNewSale(req: Request, res: Response) {
        const { idOrder } = req.params;

        const order: IOrder | null = await OrderModel.findById(idOrder)
            .populate("cartProducts.subProduct")
            .populate("userId")
            .exec();
        // console.log("productos del carrito: ", order?.cartProducts);

        console.log({ message: "mail service order", order });

        const filePath = path.join(
            __dirname,
            "../views",
            "sendEmailToAdminNewSale.ejs"
        );

        const html = await ejs.renderFile(filePath, { order, moment });
        res.send(html);
    }
    public async testSendEmailToNewUser(req: Request, res: Response) {
        const { idUser } = req.params;

        const user = await UserService.getOneUserById(idUser);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        console.log("mail welcome: ", { user });

        // Ruta del archivo EJS de la plantilla de bienvenida
        const filePath = path.join(
            __dirname,
            "../views",
            "sendEmailToNewUser.ejs"
        );

        const html = await ejs.renderFile(filePath, { user, moment });
        res.send(html);
        //     try {
        //         const {idUser} = req.params
        //         const test = await this.mailService.sendEmailToNewUser(idUser)
        //         res.send(test)
        //     } catch (error) {
        //         res.send(error);
        //     }
    }
}
