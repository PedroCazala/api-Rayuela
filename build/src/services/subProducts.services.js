"use strict";
// import { IProduct } from "../interfaces/products.interface";
// import { IProduct } from "../interfaces/products.interface";
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
exports.SubProductsService = void 0;
const subProducts_dao_mongo_1 = require("../daos/subProducts.dao.mongo");
class SubProductsService {
    // static getAllProducts(){
    //     const products = ProductsDaoMongo.getAllProducts()
    //     return products
    // }
    static getOneSubProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.getOneById(id);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.SubProductsService = SubProductsService;
// interface PropsUpdate{
//     idProduct:String,
//     newData:Object
// }
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
