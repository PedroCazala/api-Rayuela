// import { ICompleteProduct } from "../interfaces/products.interface";
import { CartsServices } from "../services/carts.services";
import { Request, Response /*, NextFunction */ } from "express";
// import { SubProductsService } from "../services/subProducts.services";
// import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";
import {
    MercadoPagoConfig,
    Preference,
    Payment
} from "mercadopago";
export class PaymentsController {
    static async createOrder(req: Request, res: Response) {
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
                        back_urls:{
                            success: 'http://localhost:9090/api/payments/success',
                            failure: 'http://localhost:9090/api/payments/failure',
                            pending: 'http://localhost:9090/api/payments/pending',
                        },
                        notification_url:'https://0a6c-190-184-231-244.ngrok-free.app/webhook'
                    }
                });

                console.log(result);
                res.send(result);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.error("El token de acceso no está definido.");
        }
    }
    static async receiveWebhook(req: Request, res: Response) {
        const paymentQuery= req.query
        console.log(paymentQuery,'paymentQuery');
        try {
            if(paymentQuery.type==='payment'){
                const client = new MercadoPagoConfig({ accessToken: 'access_token' });

            }
            // const payment = new Payment(client);
            // payment.get(
            //     {
            //         id:paymentQuery['data.id']
            //     }
            // )
        } catch (error) {
            console.log(error);
            
        }
    }
}
