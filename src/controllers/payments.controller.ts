import { Request, Response /*, NextFunction */ } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
export class PaymentsController {
    static async createOrder(_: Request, res: Response) {
        // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro

        const accessToken = process.env.ACCESS_TOKEN_MP;
        if (accessToken) {
            const client = new MercadoPagoConfig({
                accessToken: accessToken,
            });

            const preference = new Preference(client);
            try {
                const result = await preference.create({
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
                        notification_url:
                            "https://996d-190-184-231-139.ngrok-free.app/api/payments/webhook",
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
                    const client = new MercadoPagoConfig({
                        accessToken: accessToken,
                    });
                    // Crear una instancia de Payment con el cliente
                    const paymentApi = new Payment(client);
                    // const preference = new Prefercleaence(client);
                    // Buscar el pago por el id
                    const data = await paymentApi.get({
                     id: paymentQuery["data.id"] as string,
                    });
                    console.log(data,'funciono todo bien y entro y mostro esa data');
                // }

            }
            res.sendStatus(204)
        } catch (error) {
            console.log('entro al catch')
            res.sendStatus(500)
            console.log(error);
        }
    }
}
