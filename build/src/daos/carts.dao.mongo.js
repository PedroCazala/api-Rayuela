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
exports.CartsDaoMongo = void 0;
const cart_model_1 = require("../models/cart.model");
class CartsDaoMongo {
    // // Traer un carrito
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.CartModel.findOne({ _id: id })
                .populate({
                path: 'products',
                model: 'subProducts',
                populate: {
                    path: 'IDProduct',
                    model: 'Products', // Nombre de la colección de productos
                    // select: 'name description price', // Campos que deseas incluir
                },
            })
                .lean();
            return cart;
        });
    }
    static createCart(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.CartModel.create(newCart);
            return cart;
        });
    }
    static deleteCart(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.CartModel.deleteOne({ _id: idCart });
            return cart;
        });
    }
    static addSubprodctToCart({ idCart, subProduct }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield cart_model_1.CartModel.findOneAndUpdate({ _id: idCart }, { $push: { products: subProduct } });
                // const updated = await CartModel.findOne({ _id: idCart });
                return updated;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    static modifiedProductToCart({ idCart, subProducts }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const updated = await CartModel.findOneAndUpdate({_id:idCart},cart)
            const updated = yield cart_model_1.CartModel.findOneAndUpdate({ _id: idCart }, { products: subProducts });
            return updated;
        });
    }
}
exports.CartsDaoMongo = CartsDaoMongo;
