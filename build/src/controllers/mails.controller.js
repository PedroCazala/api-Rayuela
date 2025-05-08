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
exports.MailController = void 0;
const mails_service_1 = require("../services/mails.service");
const order_model_1 = require("../models/order.model");
const moment_1 = __importDefault(require("moment"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const user_services_1 = require("../services/user.services");
const mongoose_1 = require("mongoose");
// const idOrder = "679aac0c7bacf77daa5b2ec3";
class MailController {
    constructor() {
        this.mailService = new mails_service_1.MailService();
    }
    testOrderConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrder } = req.params;
            const order = yield order_model_1.OrderModel.findById(idOrder)
                .populate("cartProducts.subProduct")
                .populate("userId")
                .exec();
            console.log("productos del carrito: ", order === null || order === void 0 ? void 0 : order.cartProducts);
            const filePath = path_1.default.join(__dirname, "../views", "orderConfirmation.ejs");
            const html = yield ejs_1.default.renderFile(filePath, { order, moment: moment_1.default });
            res.send(html);
        });
    }
    testSendEmailToAdminNewSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idOrder } = req.params;
                // Validar si idOrder es un ObjectId válido
                if (!(0, mongoose_1.isValidObjectId)(idOrder)) {
                    return res.status(400).json({ error: "ID de orden inválido" });
                }
                // Buscar la orden en la base de datos
                const order = yield order_model_1.OrderModel.findById(idOrder)
                    .populate("cartProducts.subProduct")
                    .populate("userId")
                    .exec();
                // Si no se encuentra la orden, devolver error
                if (!order) {
                    return res.status(404).json({ error: "Orden no encontrada" });
                }
                console.log({ message: "mail service order", order });
                // Construir la ruta de la plantilla
                const filePath = path_1.default.resolve(__dirname, "../views/sendEmailToAdminNewSale.ejs");
                const html = yield ejs_1.default.renderFile(filePath, { order, moment: moment_1.default });
                return res.send(html);
            }
            catch (error) {
                console.error("Error en testSendEmailToAdminNewSale:", error);
                return res
                    .status(500)
                    .json({ error: "Error interno del servidor" });
            }
        });
    }
    testSendEmailToNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const user = yield user_services_1.UserService.getOneUserById(idUser);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            console.log("mail welcome: ", { user });
            // Ruta del archivo EJS de la plantilla de bienvenida
            const filePath = path_1.default.join(__dirname, "../views", "sendEmailToNewUser.ejs");
            const html = yield ejs_1.default.renderFile(filePath, { user, moment: moment_1.default });
            res.send(html);
            //     try {
            //         const {idUser} = req.params
            //         const test = await this.mailService.sendEmailToNewUser(idUser)
            //         res.send(test)
            //     } catch (error) {
            //         res.send(error);
            //     }
        });
    }
}
exports.MailController = MailController;
