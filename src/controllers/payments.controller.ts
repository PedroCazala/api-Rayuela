import { Request, Response /*, NextFunction */ } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { CartsServices } from "../services/carts.services";
import { OrdersServices } from "../services/orders.services";
import { UserService } from "../services/user.services";
export class PaymentsController {
    static async createOrder(req: Request, res: Response) {
        // const data:string[] =req.body // para que despues se vea los item del carrito, o quizas el id del carro
        const { idCart } = req.params;
        const { idUser} = req.params;

        const accessToken = process.env.ACCESS_TOKEN_MP;
        if (accessToken) {
            const client = new MercadoPagoConfig({
                accessToken: accessToken,
            });

            const preference = new Preference(client);
            try {
                const user = await UserService.getOneUserById(idUser);
                const cart = await CartsServices.getCart(idCart);
                const items = cart?.products.map((item) => {
                    return {
                        id: item.subProduct._id,
                        title: item.subProduct.IDProduct.name,
                        quantity: item.quantity,
                        unit_price: item.subProduct.IDProduct.price,
                        picture_url: 'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg'//item.subProduct.img[0]
                    };
                });
                if(items){
                    
                    const result = await preference.create({
                        body: {
                            payer:{
                                email:"cazalapedro@gmail.com",//user?.email,
                                // id:user?._id
                            },
                            // additional_info:{
                                
                                //     user_id:user?._id,
                                // },
                                items: items
                                ,
                                back_urls: {
                                    success: `${process.env.HOST}/api/payments/success`,
                                    failure: `${process.env.HOST}/api/payments/failure`,
                                    pending: `${process.env.HOST}/api/payments/pending`,
                                },
                                notification_url:
                                "https://87cb-190-184-231-87.ngrok-free.app/api/payments/webhook",
                            },
                        });
                        if(user && result.id){
                            const order = await OrdersServices.create({idUser:user._id,idPreference:result.id})
                            // console.log(order, 'ES LA ORDENNNN');
                        }else{
                            console.log('no creo la ORDENNN');
                            console.log(result.id);
                            console.log(user?._id);
                            
                        }
                        
                    res.send(result);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.error("El token de acceso no está definido.");
        }
    }
    static async receiveWebhook(req: Request, res: Response) {
        const paymentQuery = req.query;

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
