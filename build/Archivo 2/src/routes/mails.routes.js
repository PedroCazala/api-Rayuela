"use strict";
// import express from "express";
// import { send } from "../mails/mails";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRoutes = void 0;
// const MailRoutes = express.Router();
// MailRoutes.get("/send-email", async (req, res) => {
//     console.log("Entró a send-email");
//     try {
//         const idAplicativo = "1";
//         send(idAplicativo, async (json) => {
//             try {
//                 const info = await json.mail.sendMail({
//                     from: json.from,
//                     to: "cazalapedro@gmail.com", // Puedes hacerlo dinámico con req.body.to
//                     bcc: json.bcc,
//                     subject: "Bienvenido a la aplicación",
//                     text: "Hola, mail de prueba",
//                 });
//                 console.log("Correo enviado:", info.response);
//                 res.status(200).json({
//                     message: "Correo enviado correctamente",
//                     info,
//                 });
//             } catch (error: unknown) {
//                 if (error instanceof Error) {
//                     console.error("Error al enviar el correo:", error.message);
//                     res.status(500).json({
//                         error: "Error al enviar el correo",
//                         details: error.message,
//                     });
//                 } else {
//                     console.error(
//                         "Error desconocido al enviar el correo:",
//                         error
//                     );
//                     res.status(500).json({
//                         error: "Error desconocido al enviar el correo",
//                     });
//                 }
//             }
//         });
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error(
//                 "Error en la configuración del envío de correo:",
//                 error.message
//             );
//             res.status(500).json({
//                 error: "Error en la configuración del correo",
//                 details: error.message,
//             });
//         } else {
//             console.error(
//                 "Error desconocido en la configuración del correo:",
//                 error
//             );
//             res.status(500).json({
//                 error: "Error desconocido en la configuración del correo",
//             });
//         }
//     }
// });
// export { MailRoutes };
const express_1 = __importDefault(require("express"));
const mails_controller_1 = require("../controllers/mails.controller");
const MailRoutes = express_1.default.Router();
exports.MailRoutes = MailRoutes;
const mailController = new mails_controller_1.MailController();
MailRoutes.get("/test-email-order-confirmation/:idOrder", (req, res) => mailController.testOrderConfirmation(req, res));
MailRoutes.get("/test-email-to-admin/:idOrder", (req, res) => mailController.testSendEmailToAdminNewSale(req, res));
MailRoutes.get("/test-email-to-new-user/:idUser", (req, res) => mailController.testSendEmailToNewUser(req, res));
