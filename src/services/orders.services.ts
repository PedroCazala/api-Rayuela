import mongoose from "mongoose";
import { UserService } from "./user.services";
import { CartsServices } from "./carts.services";
import { OrdersDaoMongo } from "../daos/orders.dao.mongo";
import { IOrder } from "../interfaces/orders.interface";

export class OrdersServices {
    static async getOne(id: string) {
        try {
            const order = await OrdersDaoMongo.getOneById(id);
            return order;
        } catch (error) {
            return error;
        }
    }
    static async getAll() {
        try {
            const orders = await OrdersDaoMongo.getAll();
            return orders;
        } catch (error) {
            return error;
        }
    }
    static async getByState(state:string) {
        try {
            const orders = await OrdersDaoMongo.getByState(state);
            return orders;
        } catch (error) {
            return error;
        }
    }
    static async create({ idUser, idPreference }: ICreateOrder) {
        try {
            const user = await UserService.getOneUserById(idUser);
            const cart = await CartsServices.getCart(
                user?.cartId as unknown as string
            );
            const date = new Date();
            if (cart && user) {
                const totalPriceOfProducts =
                    await CartsServices.returnTotalPrice(cart?._id);
                const priceShipment = 0;
                const newOrder: IOrder = {
                    creationDate: date,
                    userId: idUser as unknown as mongoose.Schema.Types.ObjectId,
                    cartId: cart._id as unknown as mongoose.Schema.Types.ObjectId,
                    cartProducts: cart.products,
                    userDirection: user.direction,
                    state: "Orden-creada",
                    priceShipment,
                    totalPriceOfProducts,
                    totalPrice: totalPriceOfProducts + priceShipment,
                    preferenceIdMercadoPago: idPreference,
                };
                const order = await OrdersDaoMongo.create(newOrder);
                return order;
            }
        } catch (error) {
            return error;
        }

        // const carrito = await CartsDaoMongo.createCart(newCart);
        // return carrito;
    }

    static async delete(idCart: string) {
        // const cart = await CartsDaoMongo.deleteCart(idCart);
        // return cart;
    }
}

interface ICreateOrder {
    idPreference: string;
    idUser: string;
}
