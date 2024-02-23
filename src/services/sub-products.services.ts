import { SubProductsDaoMongo } from "../daos/sub-products.dao.mongo";
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
    static deleteSubProduct(id:String){
        const subProduct = SubProductsDaoMongo.deleteSubProduct(id)
        return subProduct
    }

    static async addImgSubProduct(idSubProduct: string, newImg: string) {
        const SubProduct = await SubProductsDaoMongo.addImgSubProduct(idSubProduct, newImg);
    
        // const carritosConProducto = await CartModel.find({ 'products.SubProduct': idSubProduct });

        // // Elimina el producto de la lista de productos en cada carrito

        // await Promise.all(
        //     carritosConProducto.map(async (carrito) => {
        //         carrito.products = carrito.products.filter((subProd) => subProd.subProduct !== idSubProduct);
        //         await carrito.save();
        //     })
        // );
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