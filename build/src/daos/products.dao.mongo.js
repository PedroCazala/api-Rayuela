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
exports.ProductsDaoMongo = void 0;
const product_model_1 = require("../models/product.model");
class ProductsDaoMongo {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield product_model_1.ProductModel.find();
            return allProducts;
        });
    }
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.find({ _id: id });
            return product;
        });
    }
    static getForCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.find({ category: category });
            return products;
        });
    }
    static getForBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.find({ brand: brand });
            return products;
        });
    }
    static postAProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.create(newProduct);
            return product;
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.deleteOne({ _id: id });
            return product;
        });
    }
}
exports.ProductsDaoMongo = ProductsDaoMongo;
