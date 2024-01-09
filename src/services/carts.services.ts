import { CartsDaoMongo } from "../daos/carts.dao.mongo";
import { ICart } from "../interfaces/carts.interface";
import { ICompleteSubProductToCart } from "../interfaces/products.interface";
import { SubProductsService } from "./subProducts.services";

export class CartsServices {
    static getCart(id: string) {
        const cart = CartsDaoMongo.getOneById(id);
        return cart;
    }
    static async create(userId: string) {
        const date = new Date();
        const newCart: ICart = {
            creationDate: date,
            userId,
            products: [],
        };
        const carrito = await CartsDaoMongo.createCart(newCart);
        return carrito;
    }

    static async delete(idCart: string) {
        const cart = await CartsDaoMongo.deleteCart(idCart);
        return cart;
    }
    static async getProductsOfCart(idCart: string) {
        const cart = await this.getCart(idCart);
        const productsOfCart = cart?.products;
        return productsOfCart;
    }
    static async getOneProductoOfCartById({
        idCart,
        idSubProduct,
    }: IProductOfCart) {
        try {
            const cart = await this.getCart(idCart);
            console.log("cart: ", cart?.products);

            const subProduct = cart?.products.find(
                subProd => subProd._id == idSubProduct
            );
            console.log("subProduct", subProduct);

            return subProduct;
        } catch (error) {
            console.log(error);
            throw new Error(
                "Ocurrió un error en el servicio get one Product of cart by id"
            );
        }
    }
    // static async productExistInCart({idCart,idSubProduct,quantity}:IProductOfCart){
    //     let productsOfCart = await this.getProductsOfCart(idCart)
    // }
    static async addProductToCart({
        idCart,
        idSubProduct,
        quantity,
    }: IProductOfCart) {
        try {
            const exist = await this.getOneProductoOfCartById({
                idCart,
                idSubProduct,
                quantity,
            });
            console.log("exist: ", exist);

            if (exist) {
                // const add = await this.modifiedQuantityProductToCart({idCart,})
                // return add
                return "acomodar logica para modificar";
            } else {
                const subProd = await SubProductsService.getOneSubProduct(
                    idSubProduct
                );
                if (subProd) {
                    const subProduct: ICompleteSubProductToCart = {
                        ...subProd.toObject(),
                        quantity,
                    };
                    const add = await CartsDaoMongo.addSubprodctToCart({
                        idCart,
                        subProduct,
                    });
                    return add;
                }
            }
            return undefined;
        } catch (error) {
            console.log(error);
            throw new Error(
                "Ocurrió un error en el servicio al intentar agregar el producto"
            );
        }
    }
    static async modifiedQuantityProductToCart({
        idCart,
        idSubProduct,
        quantity,
    }: IProductOfCart) {
        const cart = await this.getCart(idCart);
        const subProduct = cart?.products.find(
            (sub) => sub._id === idSubProduct
        );
        if (subProduct) {
            subProduct.quantity = quantity;
            const modified = CartsDaoMongo.modifiedProductToCart({
                idCart,
                subProduct,
            });
            return modified;
        }
        return undefined;
    }

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
interface IProductOfCart {
    idSubProduct: string;
    idCart: string;
    quantity: number;
}
// interface IModifiedProductOfCart{
//     SubProduct:ICompleteSubProductToCart,
//     quantity:number
// }
