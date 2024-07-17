import { Request, Response } from "express";
import { OrdersServices } from "../services/orders.services";

export class OrdersController {
    static async get(req: Request, res: Response) {
        const { idOrder } = req.params;
        console.log({idOrder});
        
        try {
            if (idOrder) {
                const order = await OrdersServices.getOne(idOrder);
                res.status(200).json(order);
            } else {
                const orders = await OrdersServices.getAll();
                res.status(200).json(orders);
            }
        } catch (error) {
            res.status(500).json({
                message: "No se pudo obtener el carrito",
                error,
            });
        }
    }
    static async getByState(req: Request, res: Response) {
        const { state } = req.params;
        try {
            if (state) {
                const orders = await OrdersServices.getByState(state);
                res.status(200).json(orders);
            } else {
                res.status(400).json({message:'Necesitas pasar el estado que buscas',opciones:['Orden-creada','En-preparación','En-camino','recibida']});
            }
        } catch (error) {
            res.status(500).json({
                message: "No se pudo obtener el carrito",
                error,
            });
        }
    }
}
