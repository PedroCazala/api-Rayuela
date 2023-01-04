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
exports.ProductsController = void 0;
const products_services_1 = require("../services/products.services");
class ProductsController {
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                res.send(id);
            }
            else {
                const products = yield products_services_1.ProductsService.getAllProducts();
                if (products[0]) {
                    res.status(200).json(products);
                }
                else {
                    res.status(404).json({ message: `No found products in database` });
                }
            }
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('holi');
            try {
                const data = req.body;
                const product = yield products_services_1.ProductsService.createProduct(data);
                res.status(200).json({ product, message: `El producto fué creado con el id $ {product._id}` });
            }
            catch (error) {
                console.log('enttro al catch');
                res.status(500).json({ message: `error`, error });
            }
        });
    }
}
exports.ProductsController = ProductsController;
