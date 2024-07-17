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
exports.OrdersServices = void 0;
const user_services_1 = require("./user.services");
const carts_services_1 = require("./carts.services");
const orders_dao_mongo_1 = require("../daos/orders.dao.mongo");
class OrdersServices {
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orders_dao_mongo_1.OrdersDaoMongo.getOneById(id);
                return order;
            }
            catch (error) {
                return error;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_dao_mongo_1.OrdersDaoMongo.getAll();
                return orders;
            }
            catch (error) {
                return error;
            }
        });
    }
    static getByState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_dao_mongo_1.OrdersDaoMongo.getByState(state);
                return orders;
            }
            catch (error) {
                return error;
            }
        });
    }
    static create({ idUser, idPreference }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_services_1.UserService.getOneUserById(idUser);
                const cart = yield carts_services_1.CartsServices.getCart(user === null || user === void 0 ? void 0 : user.cartId);
                const date = new Date();
                if (cart && user) {
                    const totalPriceOfProducts = yield carts_services_1.CartsServices.returnTotalPrice(cart === null || cart === void 0 ? void 0 : cart._id);
                    const priceShipment = 0;
                    const newOrder = {
                        creationDate: date,
                        userId: idUser,
                        cartId: cart._id,
                        cartProducts: cart.products,
                        userDirection: user.direction,
                        state: "Orden-creada",
                        priceShipment,
                        totalPriceOfProducts,
                        totalPrice: totalPriceOfProducts + priceShipment,
                        preferenceIdMercadoPago: idPreference,
                    };
                    const order = yield orders_dao_mongo_1.OrdersDaoMongo.create(newOrder);
                    return order;
                }
            }
            catch (error) {
                return error;
            }
            // const carrito = await CartsDaoMongo.createCart(newCart);
            // return carrito;
        });
    }
    static delete(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            // const cart = await CartsDaoMongo.deleteCart(idCart);
            // return cart;
        });
    }
}
exports.OrdersServices = OrdersServices;
