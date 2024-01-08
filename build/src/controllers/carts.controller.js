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
exports.CartsController = void 0;
// import { ICompleteProduct } from "../interfaces/products.interface";
const carts_services_1 = require("../services/carts.services");
// import { SubProductsService } from "../services/subProducts.services";
// import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";
class CartsController {
    static createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const cart = yield carts_services_1.CartsServices.create(userId);
                res.status(200).json({ message: `carrito creado`, cart });
            }
            catch (error) {
                res.status(500).json({ message: "No se pudo crear el carrito", error });
            }
        });
    }
    static getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCart } = req.params;
            console.log('el id del carro que se busca es: ', idCart);
            try {
                const cart = yield carts_services_1.CartsServices.getCart(idCart);
                res.status(200).json(cart);
            }
            catch (error) {
                res.status(500).json({ message: "No se pudo crear el carrito", error });
            }
        });
    }
    static deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCart } = req.params;
            try {
                yield carts_services_1.CartsServices.delete(idCart);
                res.status(200).json({ message: `Se borró el carrito con el id: ${idCart}.` });
            }
            catch (error) {
                console.log('entro al catch');
                res.status(500).json({ message: "No se pudo eliminar el carrito", error });
            }
        });
    }
}
exports.CartsController = CartsController;
