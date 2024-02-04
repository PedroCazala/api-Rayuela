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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
// import { SubProductsService } from "../services/subProducts.services";
// import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";
const mercadopago_1 = require("mercadopago");
class PaymentsController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = process.env.ACCESS_TOKEN_MP;
            if (accessToken) {
                const client = new mercadopago_1.MercadoPagoConfig({
                    accessToken: accessToken,
                });
                const preference = new mercadopago_1.Preference(client);
                try {
                    const result = yield preference.create({
                        body: {
                            items: [
                                {
                                    id: "1",
                                    title: "lapicera",
                                    quantity: 1,
                                    unit_price: 100,
                                },
                            ],
                            back_urls: {
                                success: 'http://localhost:9090/api/payments/success',
                                failure: 'http://localhost:9090/api/payments/failure',
                                pending: 'http://localhost:9090/api/payments/pending',
                            },
                            notification_url: 'https://0a6c-190-184-231-244.ngrok-free.app/webhook'
                        }
                    });
                    console.log(result);
                    res.send(result);
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                console.error("El token de acceso no está definido.");
            }
        });
    }
    static receiveWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentQuery = req.query;
            console.log(paymentQuery, 'paymentQuery');
            try {
                if (paymentQuery.type === 'payment') {
                    const client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'access_token' });
                }
                // const payment = new Payment(client);
                // payment.get(
                //     {
                //         id:paymentQuery['data.id']
                //     }
                // )
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.PaymentsController = PaymentsController;
