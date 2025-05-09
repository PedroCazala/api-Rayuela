import { Request, Response /*, NextFunction */ } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { CartsServices } from "../services/carts.services";
import { OrdersServices } from "../services/orders.services";
import { UserService } from "../services/user.services";
import { IOrder } from "../interfaces/orders.interface";
import { SubProductsService } from "../services/sub-products.services";
import { MailService } from "../services/mails.service";
export class PaymentsController {
    static async createOrder(req: Request, res: Response) {
        // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro
        const { idCart } = req.params;
        const { idUser } = req.params;
        const { typeOfShipment, priceShipment } = req.body;

        const accessToken = process.env.ACCESS_TOKEN_MP;
        const webhook_URL = process.env.WEBHOOK_URL;
        // const webhook_URL = 'https://4eff-179-42-182-253.ngrok-free.app/api/payments/webhook'; //usar en produccion
        if (accessToken) {
            const client = new MercadoPagoConfig({
                accessToken: accessToken,
            });

            const preference = new Preference(client);
            try {
                const user = await UserService.getOneUserById(idUser);
                const cart = await CartsServices.getCart(idCart);
                if (!user || !cart || !cart.products.length) {
                    return res
                        .status(404)
                        .json({ error: "User or cart not found or empty" });
                }
                const items = cart?.products.map((item) => {
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

                const order = await OrdersServices.create({
                    idUser: user._id,
                    priceShipment,
                    typeOfShipment,
                });

                const result = await preference.create({
                    body: {
                        payer: {
                            email: user?.email,
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
            } catch (error) {
                console.log(error);
            }
        } else {
            console.error("El token de acceso no está definido.");
        }
    }
    static async receiveWebhook(req: Request, res: Response) {
        const paymentQuery = req.query;
        console.log("Webhook endpoint alcanzado");
        console.log("Query:", paymentQuery);

        try {
            if (paymentQuery.type === "payment") {
                const accessToken = process.env.ACCESS_TOKEN_MP;
                if (accessToken) {
                    // Crear una instancia de MercadoPagoConfig con tu accessToken
                    const client = new MercadoPagoConfig({
                        accessToken: accessToken,
                    });
                    // Crear una instancia de Payment con el cliente
                    const paymentApi = new Payment(client);
                    const data = await paymentApi.get({
                        id: paymentQuery["data.id"] as string,
                    });

                    await OrdersServices.updateByIdOrder(
                        data.external_reference as string
                    );
                    if (data.external_reference) {
                        const order:IOrder|unknown = await OrdersServices.getOne(
                            data.external_reference
                        );
                        console.log({order,external_reference:data.external_reference});
                        // ----- restar el stock ------
                        if (order) {
                            
                            order?.cartProducts.map(async (prod) => {
                                console.log({ m: "en el map", prod });

                                await SubProductsService.discountStockSubProduct(
                                    {
                                        idSubProduct: prod.subProduct._id,
                                        subtract: prod.quantity,
                                    }
                                );
                            });

                            // vaciar el carrito
                            await CartsServices.clearCart(order.cartId);

                            //Enviar mail al usuario
                            const mailService = new MailService();
                            await mailService.orderConfirmation(order._id);
                            await mailService.sendEmailToAdminNewSale(order._id);
                        }
                    }
                    res.sendStatus(204);
                }
            }
        } catch (error) {
            console.log("entro al catch");
            res.sendStatus(500);
            console.log(error);
        }
    }
}
