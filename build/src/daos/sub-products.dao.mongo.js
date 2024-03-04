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
exports.SubProductsDaoMongo = void 0;
const product_model_1 = require("../models/product.model");
class SubProductsDaoMongo {
    static getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProduct = yield product_model_1.SubProductsModel.findOne({ _id: id }).populate('IDProduct');
            return subProduct;
        });
    }
    static getOneByIdToCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProduct = yield product_model_1.SubProductsModel.findOne({ _id: id });
            // subProduct &&     await subProduct.populate('IDProduct')
            return subProduct;
        });
    }
    static CreateSubProducts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProducts = yield product_model_1.SubProductsModel.create(data);
            return subProducts;
        });
    }
    static updateSubProduct({ idSubProduct, newData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProducts = yield product_model_1.SubProductsModel.findByIdAndUpdate(idSubProduct, newData, { new: true });
            return subProducts;
        });
    }
    static addImgSubProduct(idSubProduct, newImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProduct = yield product_model_1.SubProductsModel.findByIdAndUpdate(idSubProduct, { $push: { img: newImg } }, { new: true } // Esto devuelve el documento actualizado
            );
            return subProduct;
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
    // static async updateProduct({idProduct,newData}:IPropsUpdateProduct){
    //     const product =await ProductModel.findByIdAndUpdate(idProduct,newData,{new:true})
    //     return product
    // }
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
    // static async deleteProduct(id:String){
    //     const product =await ProductModel.deleteOne({_id:id})
    //     return product
    // }
    static deleteSubProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.SubProductsModel.deleteOne({ _id: id });
            return product;
        });
    }
}
exports.SubProductsDaoMongo = SubProductsDaoMongo;
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
