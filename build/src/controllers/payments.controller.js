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
const sub_products_services_1 = require("../services/sub-products.services");
const mails_service_1 = require("../services/mails.service");
class PaymentsController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro
            const { idCart } = req.params;
            const { idUser } = req.params;
            const { typeOfShipment, priceShipment } = req.body;
            const accessToken = process.env.ACCESS_TOKEN_MP;
            const webhook_URL = process.env.WEBHOOK_URL;
            // const webhook_URL = 'https://4eff-179-42-182-253.ngrok-free.app/api/payments/webhook'; //usar en produccion
            if (accessToken) {
                const client = new mercadopago_1.MercadoPagoConfig({
                    accessToken: accessToken,
                });
                const preference = new mercadopago_1.Preference(client);
                try {
                    const user = yield user_services_1.UserService.getOneUserById(idUser);
                    const cart = yield carts_services_1.CartsServices.getCart(idCart);
                    if (!user || !cart || !cart.products.length) {
                        return res
                            .status(404)
                            .json({ error: "User or cart not found or empty" });
                    }
                    const items = cart === null || cart === void 0 ? void 0 : cart.products.map((item) => {
                        return {
                            id: item.subProduct._id,
                            title: item.subProduct.IDProduct.name,
                            quantity: item.quantity,
                            unit_price: item.subProduct.IDProduct.price,
                            picture_url: "https://rayu.com.ar/images/logo.png", //item.subProduct.img[0]
                        };
                    });
                    if (priceShipment && priceShipment > 0) {
                        items.push({
                            id: "shipment",
                            title: "Costo de envío",
                            quantity: 1,
                            unit_price: priceShipment,
                            picture_url: "https://rayu.com.ar/images/logo.png", //item.subProduct.img[0]
                        });
                    }
                    const order = yield orders_services_1.OrdersServices.create({
                        idUser: user._id,
                        priceShipment,
                        typeOfShipment,
                    });
                    const result = yield preference.create({
                        body: {
                            payer: {
                                email: user === null || user === void 0 ? void 0 : user.email,
                                // id:user?._id
                            },
                            items: items,
                            external_reference: order._id,
                            back_urls: {
                                success: `${process.env.FRONTEND_URL}/success`,
                                failure: `${process.env.FRONTEND_URL}/failure`,
                                pending: `${process.env.FRONTEND_URL}/pending`,
                            },
                            notification_url: webhook_URL,
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
            const paymentQuery = req.query;
            console.log("Webhook endpoint alcanzado");
            console.log("Query:", paymentQuery);
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
                        yield orders_services_1.OrdersServices.updateByIdOrder(data.external_reference);
                        if (data.external_reference) {
                            const order = yield orders_services_1.OrdersServices.getOne(data.external_reference);
                            console.log({ order, external_reference: data.external_reference });
                            // ----- restar el stock ------
                            if (order) {
                                order === null || order === void 0 ? void 0 : order.cartProducts.map((prod) => __awaiter(this, void 0, void 0, function* () {
                                    console.log({ m: "en el map", prod });
                                    yield sub_products_services_1.SubProductsService.discountStockSubProduct({
                                        idSubProduct: prod.subProduct._id,
                                        subtract: prod.quantity,
                                    });
                                }));
                                // vaciar el carrito
                                yield carts_services_1.CartsServices.clearCart(order.cartId);
                                //Enviar mail al usuario
                                const mailService = new mails_service_1.MailService();
                                yield mailService.orderConfirmation(order._id);
                                yield mailService.sendEmailToAdminNewSale(order._id);
                            }
                        }
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
