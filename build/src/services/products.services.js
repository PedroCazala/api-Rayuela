"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const products_dao_mongo_1 = require("../daos/products.dao.mongo");
class ProductsService {
    static getAllProducts() {
        const products = products_dao_mongo_1.ProductsDaoMongo.getAllProducts();
        return products;
    }
    static getOneProduct(id) {
        return id;
    }
    static createProduct(data) {
        const date = new Date().toLocaleString();
        const newProduct = Object.assign(Object.assign({}, data), { date });
        const product = products_dao_mongo_1.ProductsDaoMongo.postAProduct(newProduct);
        return product;
    }
}
exports.ProductsService = ProductsService;
