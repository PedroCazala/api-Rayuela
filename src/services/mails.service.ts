import { IOrder } from "../interfaces/orders.interface";
import { send } from "../mails/mails";
import { OrderModel } from "../models/order.model";
import moment from "moment";
import ejs from "ejs";
import path from "path";
import { UserService } from "./user.services";

export class MailService {
    public async orderConfirmation(orderId: string) {
        const order: IOrder | null = await OrderModel.findById(orderId)
            .populate("cartProducts.subProduct")
            .populate("userId")
            .exec();

        if (!order) throw new Error("Orden no encontrada");
        console.log("mail orderConfirmation: ", { order });

        console.log({ cartproducts: order.cartProducts });

        const idAplicativo = "1";

        const filePath = path.join(
            __dirname,
            "../views",
            "orderConfirmation.ejs"
        );
        const html = await ejs.renderFile(filePath, { order, moment });

        return new Promise((resolve, reject) => {
            send(idAplicativo, async (json) => {
                try {
                    const info = await json.mail.sendMail({
                        from: json.from,
                        to: order.userId.email, //process.env.MAIL_ADMIN,
                        bcc: json.bcc,
                        subject: "Pedido realizado",
                        // text: "Hola, mail de prueba",
                        html: html,
                    });

                    console.log("Correo enviado:", info.response);
                    resolve(info);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    public async sendEmailToAdminNewSale(orderId: string) {
        const order: IOrder | null = await OrderModel.findById(orderId)
            .populate("cartProducts.subProduct")
            .populate("userId")
            .exec();

        if (!order) throw new Error("Orden no encontrada");
        console.log("mail orderConfirmation: ", { order });

        const idAplicativo = "1";

        const filePath = path.join(
            __dirname,
            "../views",
            "sendEmailToAdminNewSale.ejs"
        );
        const html = await ejs.renderFile(filePath, { order, moment });

        return new Promise((resolve, reject) => {
            send(idAplicativo, async (json) => {
                try {
                    const info = await json.mail.sendMail({
                        from: json.from,
                        to: process.env.MAIL_ADMIN,
                        bcc: json.bcc,
                        subject: "Pedido realizado",
                        // text: "Hola, mail de prueba",
                        html: html,
                    });

                    console.log("Correo enviado:", info.response);
                    resolve(info);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    public static async sendEmailToNewUser(userId: string) {
        // Obtener los detalles del usuario
        const user = await UserService.getOneUserById(userId);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        console.log("mail welcome: ", { user });

        const idAplicativo = "1"; // Identificador de la aplicación (si es necesario)

        // Ruta del archivo EJS de la plantilla de bienvenida
        const filePath = path.join(
            __dirname,
            "../views",
            "sendEmailToNewUser.ejs"
        );

        // Renderiza el archivo EJS con los datos del usuario
        const html = await ejs.renderFile(filePath, { user, moment });

        // Promesa para enviar el correo
        return new Promise((resolve, reject) => {
            send(idAplicativo, async (json) => {
                try {
                    // Enviar el correo
                    const info = await json.mail.sendMail({
                        from: json.from,
                        to: user.email, // El correo del usuario
                        bcc: json.bcc, // Copia oculta (opcional)
                        subject: "¡Bienvenido a Rayu!",
                        html: html, // HTML renderizado con EJS
                    });

                    console.log("Correo de bienvenida enviado:", info.response);
                    resolve(info);
                } catch (error) {
                    console.error("Error al enviar correo:", error);
                    reject(error);
                }
            });
        });
    }
}
