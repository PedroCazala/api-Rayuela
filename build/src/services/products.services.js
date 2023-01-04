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
exports.ProductsService = void 0;
const products_dao_mongo_1 = require("../daos/products.dao.mongo");
// import { IProduct } from "../interfaces/products.interface";
class ProductsService {
    static getAllProducts() {
        const products = products_dao_mongo_1.ProductsDaoMongo.getAllProducts();
        return products;
    }
    static getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_dao_mongo_1.ProductsDaoMongo.getOneById(id);
                return product;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForCategory(category);
                return products;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForBrand(brand);
                return products;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static createProduct(data) {
        const date = new Date();
        const newProduct = Object.assign(Object.assign({}, data), { creationDate: date });
        const product = products_dao_mongo_1.ProductsDaoMongo.postAProduct(newProduct);
        return product;
    }
    static deleteProduct(id) {
        const product = products_dao_mongo_1.ProductsDaoMongo.deleteProduct(id);
        return product;
    }
}
exports.ProductsService = ProductsService;
