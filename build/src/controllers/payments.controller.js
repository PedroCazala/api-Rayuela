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
const mercadopago_1 = require("mercadopago");
class PaymentsController {
    static createOrder(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro
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
                                success: `${process.env.HOST}/api/payments/success`,
                                failure: `${process.env.HOST}/api/payments/failure`,
                                pending: `${process.env.HOST}/api/payments/pending`,
                            },
                            notification_url: "https://996d-190-184-231-139.ngrok-free.app/api/payments/webhook",
                        },
                    });
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
            console.log("ENTRO AL RECEIVE WEBHOOK");
            const paymentQuery = req.query;
            console.log(paymentQuery, "paymentQuery");
            // const CLAVEWEBHOOK= 'd66e55d715cf9e5e5c42bee5b03feae642caf388ad3849e22e1219326d566d5a'
            // if (CLAVEWEBHOOK === PAY) {
            // }
            try {
                // if (paymentQuery.type === "payment") {
                const accessToken = process.env.ACCESS_TOKEN_MP;
                if (accessToken) {
                    // Crear una instancia de MercadoPagoConfig con tu accessToken
                    const client = new mercadopago_1.MercadoPagoConfig({
                        accessToken: accessToken,
                    });
                    // Crear una instancia de Payment con el cliente
                    const paymentApi = new mercadopago_1.Payment(client);
                    // const preference = new Prefercleaence(client);
                    // Buscar el pago por el id
                    const data = yield paymentApi.get({
                        id: paymentQuery["data.id"],
                    });
                    console.log(data, 'funciono todo bien y entro y mostro esa data');
                    // }
                }
                res.sendStatus(204);
            }
            catch (error) {
                console.log('entro al catch');
                res.sendStatus(500);
                console.log(error);
            }
        });
    }
}
exports.PaymentsController = PaymentsController;
