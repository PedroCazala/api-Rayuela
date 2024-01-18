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
                console.log(subProduct);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getOneSubProductToCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.getOneByIdToCart(id);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static createSubProducts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSubProducts = yield subProducts_dao_mongo_1.SubProductsDaoMongo.CreateSubProducts(data);
            return newSubProducts;
            // const date:Date = new Date();
            // const product = ProductsDaoMongo.postAProduct(newProduct)
            // return product
        });
    }
    static updateSubProducts({ idSubProduct, newData }) {
        const subProds = subProducts_dao_mongo_1.SubProductsDaoMongo.updateSubproducts({ idSubProduct, newData });
        return subProds;
    }
    // static updateProduct({idProduct,newData}:PropsUpdate){
    //     const product = ProductsDaoMongo.updateProduct({idProduct,newData})
    //     return product
    // }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})
    //     return product
    // }
    static deleteSubProduct(id) {
        const product = subProducts_dao_mongo_1.SubProductsDaoMongo.deleteSubProduct(id);
        return product;
    }
}
exports.SubProductsService = SubProductsService;
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
