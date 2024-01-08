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
exports.CartsServices = void 0;
const carts_dao_mongo_1 = require("../daos/carts.dao.mongo");
class CartsServices {
    static getCart(id) {
        const cart = carts_dao_mongo_1.CartsDaoMongo.getOneById(id);
        return cart;
    }
    static create(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const newCart = {
                creationDate: date,
                userId,
                products: []
            };
            const carrito = yield carts_dao_mongo_1.CartsDaoMongo.createCart(newCart);
            return carrito;
        });
    }
    static delete(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_mongo_1.CartsDaoMongo.deleteCart(idCart);
            return cart;
        });
    }
    static getProductsOfCart(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCart(idCart);
            const productsOfCart = cart === null || cart === void 0 ? void 0 : cart.products;
            return productsOfCart;
        });
    }
}
exports.CartsServices = CartsServices;
// interface PropsUpdate{
//     idProduct:String,
//     newData:IProduct
// }
// interface IProductOfCart{
//     idSubProduct:string,
//     idCart:string,
//     quantity:Object
// }
