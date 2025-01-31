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
    // Traer todos los productos
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield product_model_1.ProductModel.find().populate("IDSubProducts");
            return allProducts;
        });
    }
    // Traer todos los subproductos
    static getAllSubProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield product_model_1.SubProductsModel.find();
            return allProducts;
        });
    }
    //traer productos por CATEGORÍA
    static getForCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.find({
                category: category,
            }).populate("IDSubProducts");
            return products;
        });
    }
    //traer productos por MARCA
    static getForBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.find({ brand: brand }).populate("IDSubProducts");
            return products;
        });
    }
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.findOne({ _id: id }).populate("IDSubProducts");
            return product;
        });
    }
    //Crear un producto
    static postAProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.create(newProduct);
            console.log(product);
            return product;
        });
    }
    static updateProduct({ idProduct, newData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.findByIdAndUpdate(idProduct, newData, { new: true });
            return product;
        });
    }
    static addIDSubProductToProduct({ idProduct, arrayIdsSub, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.updateOne({ _id: idProduct }, { $push: { IDSubProducts: { $each: arrayIdsSub } } });
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
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
