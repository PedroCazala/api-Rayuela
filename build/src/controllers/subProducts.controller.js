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
exports.SubProductsController = void 0;
const subProducts_services_1 = require("../services/subProducts.services");
// import { IProduct } from "../interfaces/products.interface";
class SubProductsController {
    static getSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const subProduct = yield subProducts_services_1.SubProductsService.getOneSubProduct(id);
                subProduct
                    ? res.status(200).json(subProduct)
                    : res.status(404).json(`SubProduct with id: ${id}, don't exist`);
            }
            // else {
            //     const products = await SubProductsService.getAllProducts();
            //     products[0]
            //         ? res.status(200).json(products)
            //         : res.status(404).json({ message: `No found products in database` });
            // }
        });
    }
}
exports.SubProductsController = SubProductsController;