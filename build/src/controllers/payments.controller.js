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
const carts_services_1 = require("../services/carts.services");
const orders_services_1 = require("../services/orders.services");
const user_services_1 = require("../services/user.services");
class PaymentsController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro
            const { idCart } = req.params;
            const { idUser } = req.params;
            const accessToken = process.env.ACCESS_TOKEN_MP;
            if (accessToken) {
                const client = new mercadopago_1.MercadoPagoConfig({
                    accessToken: accessToken,
                });
                const preference = new mercadopago_1.Preference(client);
                try {
                    const user = yield user_services_1.UserService.getOneUserById(idUser);
                    const cart = yield carts_services_1.CartsServices.getCart(idCart);
                    const items = cart === null || cart === void 0 ? void 0 : cart.products.map((item) => {
                        return {
                            id: item.subProduct._id,
                            title: item.subProduct.IDProduct.name,
                            quantity: item.quantity,
                            unit_price: item.subProduct.IDProduct.price,
                            picture_url: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg' //item.subProduct.img[0]
                        };
                    });
                    if (items) {
                        const result = yield preference.create({
                            body: {
                                payer: {
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    // id:user?._id
                                },
                                // additional_info:{
                                //     user_id:user?._id,
                                // },
                                items: items,
                                back_urls: {
                                    success: `${process.env.HOST}/api/payments/success`,
                                    failure: `${process.env.HOST}/api/payments/failure`,
                                    pending: `${process.env.HOST}/api/payments/pending`,
                                },
                                notification_url: "https://87cb-190-184-231-87.ngrok-free.app/api/payments/webhook",
                            },
                        });
                        if (user && result.id) {
                            const order = yield orders_services_1.OrdersServices.create({ idUser: user._id, idPreference: result.id });
                            //------ ACA DEBERÍA AGREGAR EL ID DE LA PREFERENCIA Y MODIFICARLE EL ESTADO 
                            // console.log(order, 'ES LA ORDENNNN');
                        }
                        else {
                            console.log('no creo la ORDENNN');
                            console.log(result.id);
                            console.log(user === null || user === void 0 ? void 0 : user._id);
                        }
                        res.send(result);
                    }
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
            try {
                if (paymentQuery.type === "payment") {
                    const accessToken = process.env.ACCESS_TOKEN_MP;
                    if (accessToken) {
                        // Crear una instancia de MercadoPagoConfig con tu accessToken
                        const client = new mercadopago_1.MercadoPagoConfig({
                            accessToken: accessToken,
                        });
                        // Crear una instancia de Payment con el cliente
                        const paymentApi = new mercadopago_1.Payment(client);
                        const data = yield paymentApi.get({
                            id: paymentQuery["data.id"],
                        });
                        console.log(data);
                        // ----- CAMBIAR EL STATE DE LA ORDEN
                        // const order = await OrdersServices.create({idUser:user._id,idPreference:result.id})
                        // const orders = await OrdersServices.getByPreferenceIdMercadoPago(data.id)
                        res.sendStatus(204);
                    }
                }
            }
            catch (error) {
                console.log("entro al catch");
                res.sendStatus(500);
                console.log(error);
            }
        });
    }
}
exports.PaymentsController = PaymentsController;
