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
    static async getOrderByUser(req: Request, res: Response) {
        const { idUser } = req.params;        
        try {
            const orders = await OrdersServices.getOrderByUser(idUser);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({
                message: "No se pudo obtener el carrito",
                error,
            });
        }
    }
    static async getByIdMP(req: Request, res: Response) {
        const { idOrderMP } = req.params;
        console.log({idOrderMP});
        
        // try {
        //     if (idOrder) {
        //         const order = await OrdersServices.getOne(idOrder);
        //         res.status(200).json(order);
        //     } else {
        //         const orders = await OrdersServices.getAll();
        //         res.status(200).json(orders);
        //     }
        // } catch (error) {
        //     res.status(500).json({
        //         message: "No se pudo obtener el carrito",
        //         error,
        //     });
        // }
    }

    static async getEditeState(req: Request, res: Response) {
        const {idOrder,state} = req.params
        try{
            const orders = await OrdersServices.getEditeState({idOrder,state});
            res.status(200).json(orders);

        }catch(error){
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
                message: "No se pudieron obtener las ordenes",
                error,
            });
        }
    }
}
