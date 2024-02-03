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
const subProducts_services_1 = require("../services/subProducts.services");
// import { IProduct } from "../interfaces/products.interface";
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
                    : res
                        .status(404)
                        .json({ message: `No found products in database` });
            }
        });
    }
    static getSubProductsOfAProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const subProducts = yield products_services_1.ProductsService.getSubProductsOfAProduct(id);
            subProducts
                ? res.status(200).json(subProducts)
                : res.status(404).json(`Product with id: ${id}, don't exist`);
        });
    }
    static getProductsForCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.params.category;
            const products = yield products_services_1.ProductsService.getForCategory(category);
            products
                ? res.status(200).json(products)
                : res.status(404).json({
                    message: `No found products with category: ${category} in database`,
                });
        });
    }
    static getProductsForBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = req.params.brand;
            const products = yield products_services_1.ProductsService.getForBrand(brand);
            products
                ? res.status(200).json(products)
                : res.status(404).json({
                    message: `No found products with brand: ${brand} in database`,
                });
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log('data de create Product en products.controller', data);
            try {
                const subProducts = yield subProducts_services_1.SubProductsService.createSubProducts(data.subProducts);
                let IDSubProds = [];
                subProducts.forEach((sub) => (IDSubProds = [...IDSubProds, sub._id]));
                const product = yield products_services_1.ProductsService.createProduct(Object.assign(Object.assign({}, data), { IDSubProducts: IDSubProds }));
                subProducts.forEach((sub) => __awaiter(this, void 0, void 0, function* () {
                    yield subProducts_services_1.SubProductsService.updateSubProducts({ idSubProduct: sub._id, newData: { sub, IDProduct: product._id } });
                }));
                subProducts &&
                    res.status(200).json({
                        // product,
                        // subProducts,
                        message1: `El producto se creó con el id: ${product._id}`,
                        message2: `Los subproductos fueron creados con los id: ${IDSubProds}`,
                    });
            }
            catch (error) {
                res.status(500).json({ message: `error`, error });
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProduct } = req.params;
            const newData = req.body;
            try {
                const product = yield products_services_1.ProductsService.updateProduct({ idProduct, newData });
                if (product) {
                    res.status(200).json({
                        message: `Product with id: ${idProduct} was modified`, product,
                    });
                }
                else {
                    res.status(404).json({
                        message: `Product with id: ${idProduct} was not found`,
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    message: `Product with id: ${idProduct} was not found`,
                    error
                });
            }
        });
    }
    //     static async updateTypeProduct(req: Request, res: Response) {
    //         const {idProduct,idType} = req.params;
    //         const newData = req.body;
    //         console.log('hjola');
    //         try {
    //             const product = await ProductsService.updateTypeProduct({idProduct,idType,newData});
    //             res.status(200).json({
    //                 message: `Product with id: ${idProduct} was modified`,product,
    //             });
    //         } catch (error) {
    //             res.status(404).json({
    //                 message: `Product with id: ${idProduct} was not found`,
    //                 error
    //             });
    //         }
    //     }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const subProds = yield products_services_1.ProductsService.getSubProductsOfAProduct(id);
                subProds &&
                    subProds.map((sub) => __awaiter(this, void 0, void 0, function* () {
                        yield subProducts_services_1.SubProductsService.deleteSubProduct(sub._id);
                    }));
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
                    error,
                });
            }
        });
    }
}
exports.ProductsController = ProductsController;
