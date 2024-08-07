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
const subProducts_dao_mongo_1 = require("../daos/subProducts.dao.mongo");
// import { IProduct } from "../interfaces/products.interface";
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
    // traer todos los subproductos de un determinado producto
    static getSubProductsOfAProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_dao_mongo_1.ProductsDaoMongo.getOneById(id);
                const idSubProducts = product === null || product === void 0 ? void 0 : product.IDSubProducts;
                let subProducts = [];
                if (idSubProducts) {
                    for (const id of idSubProducts) {
                        const subProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.getOneById(id);
                        if (subProduct) {
                            subProducts = [...subProducts, subProduct];
                            // console.log(subProducts);
                        }
                    }
                }
                return subProducts;
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
        // const date:Date = new Date();
        const newProduct = data;
        const product = products_dao_mongo_1.ProductsDaoMongo.postAProduct(newProduct);
        return product;
    }
    static updateProduct({ idProduct, newData }) {
        const product = products_dao_mongo_1.ProductsDaoMongo.updateProduct({ idProduct, newData });
        return product;
    }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})
    //     return product
    // }
    static deleteProduct(id) {
        const product = products_dao_mongo_1.ProductsDaoMongo.deleteProduct(id);
        return product;
    }
}
exports.ProductsService = ProductsService;
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
