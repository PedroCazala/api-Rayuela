import mongoose from "mongoose";
import { UserService } from "./user.services";
import { CartsServices } from "./carts.services";
import { OrdersDaoMongo } from "../daos/orders.dao.mongo";
import { IOrder } from "../interfaces/orders.interface";
import { SubProductsService } from "./sub-products.services";
import { ICart } from "../interfaces/carts.interface";
import { OrderModel } from "../models/order.model";

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
    static async getOrderByUser(idUser: string) {
        try {
            const orders = await OrdersDaoMongo.getOrderByUser(idUser);
            return orders;
        } catch (error) {
            return error;
        }
    }
    static async getByState(state: string) {
        try {
            const orders = await OrdersDaoMongo.getByState(state);
            return orders;
        } catch (error) {
            return error;
        }
    }
    static async updateByIdOrder(idOrder: string) {
        try {
            const order = await OrdersDaoMongo.updateByIdOrder(idOrder);

            return order;
        } catch (error) {
            console.log("entro al error service updateByIdOrder", error);

            return error;
        }
    }

    static async create({
        idUser,
        priceShipment,
        typeOfShipment,
    }: ICreateOrder) {
        try {
            const user = await UserService.getOneUserById(idUser);
            if (!user) {
                throw new Error("User not found");
            }
            const cart = await CartsServices.getCart(
                user?.cartId as unknown as string
            );
            if (!cart || !cart.products.length) {
                return null;
            }

            const productsPromises = cart?.products.map(async (prod) => {
                // const price = await SubProductsService
                const product = await SubProductsService.getOneSubProduct(
                    prod.subProduct
                ); // {...prod}

                return {
                    subProduct: product /* {...prod} */,
                    quantity: prod.quantity,
                    price: prod.subProduct.IDProduct.price,
                };
            });
            const products = await Promise.all(productsPromises);

            const date = new Date();
            if (cart && user && products) {
                const totalPriceOfProducts =
                    await CartsServices.returnTotalPrice(cart?._id);
                const newOrder: IOrder = {
                    creationDate: date,
                    userId: idUser as unknown as mongoose.Schema.Types.ObjectId,
                    cartId: cart._id as unknown as mongoose.Schema.Types.ObjectId,
                    cartProducts: products,
                    userDirection: user.direction,
                    state: "Orden-creada",
                    priceShipment,
                    typeOfShipment,
                    totalPriceOfProducts,
                    totalPrice: totalPriceOfProducts + priceShipment,
                    // externalReference: externalReference,
                };
                try {
                    const order = await OrdersDaoMongo.create(newOrder);
                    return order;
                } catch (error) {
                    console.error("Error al crear la orden:", error);
                    throw error; // Para propagar el error si es necesario
                }
            }

            return null;
        } catch (error) {
            return error;
        }
    }
    static async getEditeState({ idOrder, state }: IEditState) {
        try {
            const order = await OrdersDaoMongo.getEditeState({
                idOrder,
                state,
            });
            return order;
        } catch (error) {
            return error;
        }
    }
    public static async deleteOldOrders(): Promise<void> {
        try {
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

            const result = await OrderModel.deleteMany({
                state: "Orden-creada",
                creationDate: { $lte: twentyFourHoursAgo },
                // createdAt: { $lte: twentyFourHoursAgo },
            });
            console.log(`Órdenes eliminadas: ${result.deletedCount}`);
        } catch (error) {
            console.error("Error al eliminar órdenes:", error);
        }
    }

    // static async delete(idCart: string) {
    // const cart = await CartsDaoMongo.deleteCart(idCart);
    // return cart;
    // }
}

interface IEditState {
    idOrder: string;
    state: string;
}
interface ICreateOrder {
    // externalReference: string;
    idUser: string;
    priceShipment: number;
    typeOfShipment: IOrder["typeOfShipment"];
}
