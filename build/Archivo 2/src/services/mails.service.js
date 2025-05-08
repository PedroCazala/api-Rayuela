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
exports.MailService = void 0;
const mails_1 = require("../mails/mails");
const order_model_1 = require("../models/order.model");
const moment_1 = __importDefault(require("moment"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const user_services_1 = require("./user.services");
class MailService {
    orderConfirmation(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findById(orderId)
                .populate("cartProducts.subProduct")
                .populate("userId")
                .exec();
            if (!order)
                throw new Error("Orden no encontrada");
            console.log("mail orderConfirmation: ", { order });
            console.log({ cartproducts: order.cartProducts });
            const idAplicativo = "1";
            const filePath = path_1.default.join(__dirname, "../views", "orderConfirmation.ejs");
            const html = yield ejs_1.default.renderFile(filePath, { order, moment: moment_1.default });
            return new Promise((resolve, reject) => {
                (0, mails_1.send)(idAplicativo, (json) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const info = yield json.mail.sendMail({
                            from: json.from,
                            to: order.userId.email,
                            bcc: json.bcc,
                            subject: "Pedido realizado",
                            // text: "Hola, mail de prueba",
                            html: html,
                        });
                        console.log("Correo enviado:", info.response);
                        resolve(info);
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
        });
    }
    sendEmailToAdminNewSale(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findById(orderId)
                .populate("cartProducts.subProduct")
                .populate("userId")
                .exec();
            if (!order)
                throw new Error("Orden no encontrada");
            console.log("mail orderConfirmation: ", { order });
            const idAplicativo = "1";
            const filePath = path_1.default.join(__dirname, "../views", "sendEmailToAdminNewSale.ejs");
            const html = yield ejs_1.default.renderFile(filePath, { order, moment: moment_1.default });
            return new Promise((resolve, reject) => {
                (0, mails_1.send)(idAplicativo, (json) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const info = yield json.mail.sendMail({
                            from: json.from,
                            to: process.env.MAIL_ADMIN,
                            bcc: json.bcc,
                            subject: "Pedido realizado",
                            // text: "Hola, mail de prueba",
                            html: html,
                        });
                        console.log("Correo enviado:", info.response);
                        resolve(info);
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
        });
    }
    static sendEmailToNewUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener los detalles del usuario
            const user = yield user_services_1.UserService.getOneUserById(userId);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            console.log("mail welcome: ", { user });
            const idAplicativo = "1"; // Identificador de la aplicación (si es necesario)
            // Ruta del archivo EJS de la plantilla de bienvenida
            const filePath = path_1.default.join(__dirname, "../views", "sendEmailToNewUser.ejs");
            // Renderiza el archivo EJS con los datos del usuario
            const html = yield ejs_1.default.renderFile(filePath, { user, moment: moment_1.default });
            // Promesa para enviar el correo
            return new Promise((resolve, reject) => {
                (0, mails_1.send)(idAplicativo, (json) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Enviar el correo
                        const info = yield json.mail.sendMail({
                            from: json.from,
                            to: user.email,
                            bcc: json.bcc,
                            subject: "¡Bienvenido a Rayu!",
                            html: html, // HTML renderizado con EJS
                        });
                        console.log("Correo de bienvenida enviado:", info.response);
                        resolve(info);
                    }
                    catch (error) {
                        console.error("Error al enviar correo:", error);
                        reject(error);
                    }
                }));
            });
        });
    }
}
exports.MailService = MailService;
