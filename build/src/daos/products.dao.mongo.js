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
            const products = yield product_model_1.ProductModel.find({ category: category }).populate("IDSubProducts");
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
    // static createTypeProduct(types:[],creationDate:String){
    //     types.map(async type=>{
    //         const typeProduct= await ProductTypeModel.create({type,creationDate})
    //     })
    // }
    // static async postAProduct(newProduct:IProduct): Promise<IProductReal>{
    //     const arrayTypes:String[] = []
    //     const creationDate=newProduct.creationDate
    //     if(newProduct.subProducts) {
    //         newProduct.subProducts.map(async(prod)=>{
    //             const typeProduct= await ProductTypeModel.create({...prod,creationDate})
    //             console.log(typeProduct);
    //             arrayTypes.push(typeProduct._id)
    //         })
    //     }
    //     const product: Promise<IProduct>= await ProductModel.create({newProduct,types:arrayTypes})
    //     return product
    // }
    static updateProduct({ idProduct, newData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.findByIdAndUpdate(idProduct, newData, { new: true });
            return product;
        });
    }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateTypeProduct){
    //     console.log(newData);
    //     const productType = await ProductModel.findById(idProduct,{},{
    //         arrayFilters: [
    //             {
    //                 "elem._id": idType
    //             }
    //         ],
    //         new: true
    //     })
    //     console.log(productType);
    //     const product = await ProductModel.findByIdAndUpdate(idProduct,{
    //         $set: {
    //             "types.$[elem]":  Object.assign({},{productType},newData)
    //             // {
    //             //     ...newData
    //             // }
    //         }
    //     },    {
    //         arrayFilters: [
    //             {
    //                 "elem._id": idType
    //             }
    //         ],
    //         new: true
    //     })
    //     return product
    // }
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
