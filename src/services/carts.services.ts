import { CartsDaoMongo } from "../daos/carts.dao.mongo";
import { ICart } from "../interfaces/carts.interface";

export class CartsServices {
    static getCart(id:string) {
        const cart = CartsDaoMongo.getOneById(id);
        return cart;
    }
    static async create(userId:string){
        const date = new Date()         
        const newCart:ICart= {
            creationDate: date,
            userId,
            products:[]
        }
        const carrito = await CartsDaoMongo.createCart(newCart);
        return carrito
    }
    

    static async delete(idCart:string){
        const cart = await CartsDaoMongo.deleteCart(idCart)
        return cart
    }
    static async getProductsOfCart(idCart:string){
        const cart = await this.getCart(idCart)
        const productsOfCart = cart?.products
        return productsOfCart
    }
    // static async productExistInCart({idCart,idSubProduct,quantity}:IProductOfCart){
    //     let productsOfCart = await this.getProductsOfCart(idCart)

        
    // }
    // static async addProductToCart({idCart,idSubProduct,quantity}:IProductOfCart){
        
    // }
    // static async modifiedQuantityProductToCart({idCart,idSubProduct,quantity}:IProductOfCart){

    // }


    // static async getOneProduct(id: string) {
    //     try {
    //         const product = await CartsDaoMongo.getOneById(id);
    //         return product;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
    // // traer todos los subproductos de un determinado producto
    // static async getSubProductsOfAProduct(id: string) {
    //     try {
    //         const product: IProduct | null = await CartsDaoMongo.getOneById(
    //             id
    //         );
    //         const idSubProducts = product?.IDSubProducts;

    //         let subProducts: ISubProduct[] = [];
    //         if(idSubProducts){
    //             for (const id of idSubProducts){
    //                 const subProduct = await SubCartsDaoMongo.getOneById(id);
    //                 if(subProduct){
    //                     subProducts = [...subProducts, subProduct]
    //                     // console.log(subProducts);
    //                 }  
    //             }
    //         }

    //         return subProducts;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }

    // static async getForCategory(category: string) {
    //     try {
    //         const products = await CartsDaoMongo.getForCategory(category);
    //         return products;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
    // static async getForBrand(brand: string) {
    //     try {
    //         const products = await CartsDaoMongo.getForBrand(brand);
    //         return products;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
    // static createProduct(data:IProduct){
    //     // const date:Date = new Date();
    //     const newProduct:IProduct = data
    //     console.log(newProduct);
        
    //     const product = CartsDaoMongo.postAProduct(newProduct)
    //     return product
    // }
    // static updateProduct({idProduct,newData}:PropsUpdate){
    //     const product = CartsDaoMongo.updateProduct({idProduct,newData})
    //     return product
    // }
    // // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    // //     const product = await CartsDaoMongo.updateTypeProduct({idProduct,idType,newData})

    // //     return product
    // // }
    // static deleteProduct(id:String){
    //     const product = CartsDaoMongo.deleteProduct(id)
    //     return product
    // }
}

// interface PropsUpdate{
//     idProduct:String,
//     newData:IProduct
// }
// interface IProductOfCart{
//     idSubProduct:string,
//     idCart:string,
//     quantity:Object
// }
