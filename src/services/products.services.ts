import { ProductsDaoMongo } from "../daos/products.dao.mongo";
// import { IProduct } from "../interfaces/products.interface";

export class ProductsService{
    static getAllProducts(){
        const products = ProductsDaoMongo.getAllProducts()
        return products
    }
    static async getOneProduct(id:string){
        try {
            const product = await ProductsDaoMongo.getOneById(id)        
            return product
        } catch (error) {
            console.log(error);
            return false
        }
    }
    static async getForCategory(category:string){
        try {
            const products = await ProductsDaoMongo.getForCategory(category)        
            return products
        } catch (error) { 
            console.log(error);
            return false
        }
    }
    static async getForBrand(brand:string){
        try {
            const products = await ProductsDaoMongo.getForBrand(brand)        
            return products
        } catch (error) { 
            console.log(error);
            return false
        }
    }
    static createProduct(data:object){
        const date:Date = new Date();
        const newProduct = {...data,creationDate:date}
        const product = ProductsDaoMongo.postAProduct(newProduct)
        return product
    }
    static deleteProduct(id:String){
        const product = ProductsDaoMongo.deleteProduct(id)
        return product
    }
}