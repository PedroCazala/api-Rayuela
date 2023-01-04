import { ProductModel } from "../models/product.model"
import { IProduct } from "../interfaces/products.interface"



export class ProductsDaoMongo {
    static async getAllProducts():Promise<IProduct[]>{
        const allProducts =await ProductModel.find()
        return allProducts
    }
    static async getOneById(id:String){
        const product =await ProductModel.find({_id:id})
        return product
    }
    static async postAProduct(newProduct:object){
        const product = await ProductModel.create(newProduct)
        return product
    }
}