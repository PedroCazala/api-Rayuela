import { ISubProduct } from "../interfaces/products.interface"
import { SubProductsModel } from "../models/product.model"



export class SubProductsDaoMongo {

    static async getOneById(id:String){
        const subProduct =await SubProductsModel.findOne({_id:id}).populate('IDProduct')
        return subProduct
    }
    static async CreateSubProducts(data:ISubProduct[]){
        const subProducts =await SubProductsModel.create(data)
        return subProducts
    }
    static async updateSubproducts({idSubProduct,newData}:IPropsUpdateSubProduct){
        const subProducts =await SubProductsModel.findByIdAndUpdate(idSubProduct,newData)
        return subProducts
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
    static async deleteSubProduct(id:String){
        const product =await SubProductsModel.deleteOne({_id:id})
        return product
    }
}
interface IPropsUpdateSubProduct{
    idSubProduct:String, 
    newData:Object
}
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }