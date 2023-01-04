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
                const product = yield products_services_1.ProductsService.getOneProduct(id);
                product
                    ? res.status(200).json(product)
                    : res.status(404).json(`Product with id: ${id}, don't exist`);
            }
            else {
                const products = yield products_services_1.ProductsService.getAllProducts();
                products[0]
                    ? res.status(200).json(products)
                    : res.status(404).json({ message: `No found products in database` });
            }
        });
    }
    static getProductsForCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.params.category;
            const products = yield products_services_1.ProductsService.getForCategory(category);
            products
                ? res.status(200).json(products)
                : res.status(404).json({ message: `No found products with category: ${category} in database` });
        });
    }
    static getProductsForBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = req.params.brand;
            const products = yield products_services_1.ProductsService.getForBrand(brand);
            products
                ? res.status(200).json(products)
                : res.status(404).json({ message: `No found products with brand: ${brand} in database` });
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const product = yield products_services_1.ProductsService.createProduct(data);
                product && res.status(200).json({
                    product,
                    message: `El producto fué creado con el id ${product._id}`,
                });
            }
            catch (error) {
                res.status(500).json({ message: `error`, error });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield products_services_1.ProductsService.deleteProduct(id);
                if (product.deletedCount > 0) {
                    res.status(200).json({
                        message: `Product with id: ${id} was deleted`,
                    });
                }
                else {
                    res.status(404).json({
                        message: `Product with id: ${id} was not found, it is probably that this product was delete before`,
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    message: `Product with id: ${id} was not found`,
                    error
                });
            }
        });
    }
}
exports.ProductsController = ProductsController;
