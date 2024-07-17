import mongoose from "mongoose";
import { UserService } from "./user.services";
import { CartsServices } from "./carts.services";
import { OrdersDaoMongo } from "../daos/orders.dao.mongo";
import { IOrder } from "../interfaces/orders.interface";
import { SubProductsService } from "./sub-products.services";

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
    static async getByState(state: string) {
        try {
            const orders = await OrdersDaoMongo.getByState(state);
            return orders;
        } catch (error) {
            return error;
        }
    }
    static async getByPreferenceIdMercadoPago(idMp: string) {
        try {
            const orders = await OrdersDaoMongo.getByPreferenceIdMercadoPago(
                idMp
            );
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
            if (!cart?.products) {
                // Si cart o cart.products es undefined, devuelve un array vacío o maneja el caso según tus necesidades
                return [];
            }

            const productsPromises = cart?.products.map(async (prod) => {
                // const price = await SubProductsService
                let product = await SubProductsService.getOneSubProduct(
                    prod.subProduct
                ); // {...prod}
                // console.log({'cada product':product});
                
                return {subProduct:product/* {...prod} */,quantity:prod.quantity,price:5};
            })
            const products =await Promise.all(productsPromises);
            console.log({ 'todos los products':JSON.stringify(products) });

            const date = new Date();
            if (cart && user && products) {
                const totalPriceOfProducts =
                    await CartsServices.returnTotalPrice(cart?._id);
                const priceShipment = 0;
                const newOrder: IOrder = {
                    creationDate: date,
                    userId: idUser as unknown as mongoose.Schema.Types.ObjectId,
                    cartId: cart._id as unknown as mongoose.Schema.Types.ObjectId,
                    cartProducts: products,
                    userDirection: user.direction,
                    state: "Orden-creada",
                    priceShipment,
                    totalPriceOfProducts, 
                    totalPrice: totalPriceOfProducts + priceShipment,
                    preferenceIdMercadoPago: idPreference,
                };
                const order = await OrdersDaoMongo.create(newOrder);
                console.log({ idOrder: order._id });

                return order;
            }
        } catch (error) {
            return error;
        }

        // const carrito = await CartsDaoMongo.createCart(newCart);
        // return carrito;
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

    static async delete(idCart: string) {
        // const cart = await CartsDaoMongo.deleteCart(idCart);
        // return cart;
    }
}

interface IEditState {
    idOrder: string;
    state: string;
}
interface ICreateOrder {
    idPreference: string;
    idUser: string;
}
