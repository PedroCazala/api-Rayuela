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
const sub_products_services_1 = require("./sub-products.services");
const order_model_1 = require("../models/order.model");
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
    static getOrderByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_dao_mongo_1.OrdersDaoMongo.getOrderByUser(idUser);
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
    static updateByIdOrder(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orders_dao_mongo_1.OrdersDaoMongo.updateByIdOrder(idOrder);
                return order;
            }
            catch (error) {
                console.log("entro al error service updateByIdOrder", error);
                return error;
            }
        });
    }
    static create({ idUser, priceShipment, typeOfShipment, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_services_1.UserService.getOneUserById(idUser);
                if (!user) {
                    throw new Error("User not found");
                }
                const cart = yield carts_services_1.CartsServices.getCart(user === null || user === void 0 ? void 0 : user.cartId);
                if (!cart || !cart.products.length) {
                    return null;
                }
                const productsPromises = cart === null || cart === void 0 ? void 0 : cart.products.map((prod) => __awaiter(this, void 0, void 0, function* () {
                    // const price = await SubProductsService
                    const product = yield sub_products_services_1.SubProductsService.getOneSubProduct(prod.subProduct); // {...prod}
                    return {
                        subProduct: product /* {...prod} */,
                        quantity: prod.quantity,
                        price: prod.subProduct.IDProduct.price,
                    };
                }));
                const products = yield Promise.all(productsPromises);
                const date = new Date();
                if (cart && user && products) {
                    const totalPriceOfProducts = yield carts_services_1.CartsServices.returnTotalPrice(cart === null || cart === void 0 ? void 0 : cart._id);
                    const newOrder = {
                        creationDate: date,
                        userId: idUser,
                        cartId: cart._id,
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
                        const order = yield orders_dao_mongo_1.OrdersDaoMongo.create(newOrder);
                        return order;
                    }
                    catch (error) {
                        console.error("Error al crear la orden:", error);
                        throw error; // Para propagar el error si es necesario
                    }
                }
                return null;
            }
            catch (error) {
                return error;
            }
        });
    }
    static getEditeState({ idOrder, state }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orders_dao_mongo_1.OrdersDaoMongo.getEditeState({
                    idOrder,
                    state,
                });
                return order;
            }
            catch (error) {
                return error;
            }
        });
    }
    static deleteOldOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const twentyFourHoursAgo = new Date();
                twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
                const result = yield order_model_1.OrderModel.deleteMany({
                    state: "Orden-creada",
                    creationDate: { $lte: twentyFourHoursAgo },
                    // createdAt: { $lte: twentyFourHoursAgo },
                });
                console.log(`Órdenes eliminadas: ${result.deletedCount}`);
            }
            catch (error) {
                console.error("Error al eliminar órdenes:", error);
            }
        });
    }
}
exports.OrdersServices = OrdersServices;
