import { SubProductsModel } from "../models/product.model"



export class SubProductsDaoMongo {

    static async getOneById(id:String){
        console.log('ENTRO');
        
        const subProduct =await SubProductsModel.findOne({_id:id})
        
        return subProduct
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
}
// interface IPropsUpdateProduct{
//     idProduct:String,
//     newData:Object
// }
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }