import { SubProductsDaoMongo } from "../daos/subProducts.dao.mongo";
import { ISubProduct } from "../interfaces/products.interface";
import { FilesService } from "./files.services";

export class SubProductsService{
    // static getAllProducts(){
    //     const products = ProductsDaoMongo.getAllProducts()
    //     return products
    // }
    static async getOneSubProduct(id:string){
        try {            
            const subProduct = await SubProductsDaoMongo.getOneById(id)   
            console.log(subProduct);
            return subProduct
        } catch (error) {
            console.log(error);
            return false
        }
    }
    static async getOneSubProductToCart(id:string){
        try {            
            const subProduct = await SubProductsDaoMongo.getOneByIdToCart(id)
            
            return subProduct
        } catch (error) {
            console.log(error);
            return false
        }
    }
    static async createSubProducts(data:ISubProduct[]){
        const newSubProducts = await SubProductsDaoMongo.CreateSubProducts(data)
        for (let i = 0; i < newSubProducts.length; i++) {
            const subProd = newSubProducts[i];
        
            // Obtener las fotos correspondientes al subproducto actual
            const matchingPhotos = data[i];
        
            if (matchingPhotos && matchingPhotos.imgFiles) {
              // Agregar las fotos usando el servicio adecuado
                console.log(matchingPhotos.imgFiles);
                
                await FilesService.addPicturesSubProducts({idSubProduct:subProd._id,files:matchingPhotos.imgFiles})
            }
        }

        return newSubProducts
        // const date:Date = new Date();
        // const product = ProductsDaoMongo.postAProduct(newProduct)
        // return product
    }
    static updateSubProducts({idSubProduct,newData}:PropsUpdate){
        const subProds = SubProductsDaoMongo.updateSubproducts({idSubProduct,newData})
        return subProds
    }
    // static updateProduct({idProduct,newData}:PropsUpdate){
    //     const product = ProductsDaoMongo.updateProduct({idProduct,newData})
    //     return product
    // }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})
        
    //     return product
    // }
    static deleteSubProduct(id:String){
        const product = SubProductsDaoMongo.deleteSubProduct(id)
        return product
    }

    static async addImgSubProduct(idSubProduct: string, newImg: string) {
        const SubProduct = await SubProductsDaoMongo.addImgSubProduct(idSubProduct, newImg);

        return SubProduct;
    }
}

interface PropsUpdate{
    idSubProduct:String,
    newData:Object
}
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }