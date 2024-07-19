import { SubProductsDaoMongo } from "../daos/sub-products.dao.mongo";
import { ISubProduct } from "../interfaces/products.interface";
import { FilesService } from "./files.services";

export class SubProductsService{
    static async getOneSubProduct(id:string){
        try {            
            const subProduct = await SubProductsDaoMongo.getOneById(id)  
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
    }
    static updateSubProduct({idSubProduct,newData}:PropsUpdate){
        const subProds = SubProductsDaoMongo.updateSubProduct({idSubProduct,newData})
        return subProds
    }
    static async discountStockSubProduct({idSubProduct,subtract}:PropsDiscountStock){
        const subProd = await this.getOneSubProduct(idSubProduct)
        console.log({MESSAGE:'entro a discountStockSubProduct',subProd});
        console.log({message:'siguiente',idSubProduct,subtract});
        
        if(subProd){
            const newStock = subProd.stock - subtract
            console.log({message:'entro al map pARA descontar',idSubProduct,subtract,newStock});
            const update = SubProductsDaoMongo.updateSubProduct({idSubProduct,newData:{subProd,stock:newStock}})
            return update
        }else{
            return new Error
        }
    }
    static deleteSubProduct(id:String){
        const subProduct = SubProductsDaoMongo.deleteSubProduct(id)
        return subProduct
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
interface PropsDiscountStock{
    idSubProduct:string,
    subtract:number
}
