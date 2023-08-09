import { SubProductsDaoMongo } from "../daos/subProducts.dao.mongo";

export class SubProductsService{
    // static getAllProducts(){
    //     const products = ProductsDaoMongo.getAllProducts()
    //     return products
    // }
    static async getOneSubProduct(id:string){
        try {            
            const subProduct = await SubProductsDaoMongo.getOneById(id)   
            return subProduct
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