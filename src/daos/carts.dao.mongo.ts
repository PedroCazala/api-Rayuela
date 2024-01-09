import { ICart } from "../interfaces/carts.interface";
import {
    ICompleteSubProductToCart,
} from "../interfaces/products.interface";
import { CartModel } from "../models/cart.model";

export class CartsDaoMongo {
    // // Traer un carrito
    static async getOneById(id: String) {
        const cart = await CartModel.findOne({ _id: id });
        return cart;
    }
    static async createCart(newCart: ICart) {
        const cart = await CartModel.create(newCart);
        return cart;
    }
    static async deleteCart(idCart: string) {
        const cart = await CartModel.deleteOne({ _id: idCart });
        console.log(cart);
        return cart;
    }
    static async addSubprodctToCart({ idCart, subProduct }: IAddSubProduct) {
        try {
            const updated =  await CartModel.findOneAndUpdate(
                { _id: idCart },
                { $push: { products: subProduct } }
            )
            // const updated = await CartModel.findOne({ _id: idCart });
            return updated;
        } catch (error) {
            console.log(error);
            return error
        }
    }
    static async modifiedProductToCart({ idCart, subProduct }: IAddSubProduct) {
        // const updated = await CartModel.findOneAndUpdate({_id:idCart},cart)
        const updated =  await CartModel.findOneAndUpdate(
            { _id: idCart },
            { $push: { products: subProduct } }
        )
        return updated;
    }
    // static async getAllProducts()/* :Promise<IProduct[]> */{
    //     const allProducts =await ProductModel.find()
    //     return allProducts
    // }
    // // Traer todos los subproductos
    // static async getAllSubProducts(){
    //     const allProducts =await SubProductsModel.find()
    //     return allProducts
    // }
    // //traer productos por CATEGORÍA
    // static async getForCategory(category:String){
    //     const products =await ProductModel.find({category:category})
    //     return products
    // }
    // //traer productos por MARCA
    // static async getForBrand(brand:String){
    //     const products =await ProductModel.find({brand:brand})
    //     return products
    // }

    // static async getOneById(id:String){
    //     const product =await ProductModel.findOne({_id:id})
    //     return product
    // }

    // //Crear un producto
    // static async postAProduct(newProduct:IProduct){
    //     const product =await ProductModel.create(newProduct)
    //     console.log(product);

    //     return product
    // }

    // // static createTypeProduct(types:[],creationDate:String){
    // //     types.map(async type=>{
    // //         const typeProduct= await ProductTypeModel.create({type,creationDate})
    // //     })
    // // }
    // // static async postAProduct(newProduct:IProduct): Promise<IProductReal>{
    // //     const arrayTypes:String[] = []
    // //     const creationDate=newProduct.creationDate
    // //     if(newProduct.subProducts) {

    // //         newProduct.subProducts.map(async(prod)=>{
    // //             const typeProduct= await ProductTypeModel.create({...prod,creationDate})
    // //             console.log(typeProduct);

    // //             arrayTypes.push(typeProduct._id)
    // //         })
    // //     }
    // //     const product: Promise<IProduct>= await ProductModel.create({newProduct,types:arrayTypes})
    // //     return product
    // // }
    // static async updateProduct({idProduct,newData}:IPropsUpdateProduct){
    //     const product =await ProductModel.findByIdAndUpdate(idProduct,newData,{new:true})
    //     return product
    // }
    // // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateTypeProduct){
    // //     console.log(newData);

    // //     const productType = await ProductModel.findById(idProduct,{},{
    // //         arrayFilters: [
    // //             {
    // //                 "elem._id": idType
    // //             }
    // //         ],
    // //         new: true
    // //     })
    // //     console.log(productType);

    // //     const product = await ProductModel.findByIdAndUpdate(idProduct,{
    // //         $set: {
    // //             "types.$[elem]":  Object.assign({},{productType},newData)
    // //             // {
    // //             //     ...newData
    // //             // }
    // //         }
    // //     },    {
    // //         arrayFilters: [
    // //             {
    // //                 "elem._id": idType
    // //             }
    // //         ],
    // //         new: true
    // //     })

    // //     return product
    // // }
    // static async deleteProduct(id:String){
    //     const product =await ProductModel.deleteOne({_id:id})
    //     return product
    // }
}
// interface IPropsUpdateProduct {
//     idProduct: String;
//     newData: IProduct;
// }
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }

interface IAddSubProduct {
    idCart: string;
    subProduct: ICompleteSubProductToCart;
}
// interface IModifiedProductOfCart {
//     idCart: string;
//     cart: ICart;
// }
