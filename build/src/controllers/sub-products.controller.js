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
const sub_products_services_1 = require("../services/sub-products.services");
// import { IProduct } from "../interfaces/products.interface";
class SubProductsController {
    static getSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const subProduct = yield sub_products_services_1.SubProductsService.getOneSubProduct(id);
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
    static updateSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSubProduct } = req.params;
            const newData = req.body;
            try {
                const product = yield sub_products_services_1.SubProductsService.updateSubProduct({ idSubProduct, newData });
                if (product) {
                    res.status(200).json({
                        message: `Product with id: ${idSubProduct} was modified`, product,
                    });
                }
                else {
                    res.status(404).json({
                        message: `Product with id: ${idSubProduct} was not found`,
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    message: `Product with id: ${idSubProduct} was not found`,
                    error
                });
            }
        });
    }
}
exports.SubProductsController = SubProductsController;
