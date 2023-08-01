import { ProductsDaoMongo } from "../daos/products.dao.mongo";
// import { IProduct } from "../interfaces/products.interface";
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
    // static createProduct(data:IProduct){
    //     const date:Date = new Date();
    //     const newProduct:IProduct = {...data,creationDate:date}
    //     // const product = ProductsDaoMongo.postAProduct(newProduct)
    //     // return product
    // }
    // static updateProduct({idProduct,newData}:PropsUpdate){
    //     const product = ProductsDaoMongo.updateProduct({idProduct,newData})
    //     return product
    // }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})
        
    //     return product
    // }
    // static deleteProduct(id:String){
    //     const product = ProductsDaoMongo.deleteProduct(id)
    //     return product
    // }
}

// interface PropsUpdate{
//     idProduct:String,
//     newData:Object
// }
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }