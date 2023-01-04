import { ProductsDaoMongo } from "../daos/products.dao.mongo";
import { IProduct } from "../interfaces/products.interface";

export class ProductsService{
    static getAllProducts(){
        const products = ProductsDaoMongo.getAllProducts()
        return products
    }
    static getOneProduct(id:string){
        const product = ProductsDaoMongo.getOneById(id)
        // console.log(product, ' enviado desde service');
        
        return product
    }
    static createProduct(data:object){
        const date = new Date().toLocaleString();
        // const newProduct:IProduct = {...data,date}
        // const product: IProduct= ProductsDaoMongo.postAProduct(newProduct)
        // return product
    }
}