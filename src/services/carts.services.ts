import { CartsDaoMongo } from "../daos/carts.dao.mongo";
import { ICart } from "../interfaces/carts.interface";
import { ICompleteSubProductToCart, ISubProduct } from "../interfaces/products.interface";
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
                (subProd) => subProd._id == idSubProduct
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

            if (exist) {
                await this.modifiedQuantityProductToCart({
                    idCart,
                    idSubProduct,
                    quantity,
                });
                const cart = await CartsServices.getCart(idCart);
                return cart;
            } else {
                const subProd = await SubProductsService.getOneSubProduct(
                    idSubProduct
                );
                if (subProd) {
                    const subProduct: ICompleteSubProductToCart = {
                        ...subProd.toObject(),
                        quantity,
                    };
                    await CartsDaoMongo.addSubprodctToCart({
                        idCart,
                        subProduct,
                    });
                    const cart = await CartsServices.getCart(idCart);

                    return cart;
                }
            }
            return undefined
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
        const subProducts = cart?.products.map((sub) => {
            if (sub._id == idSubProduct) {
                sub.quantity = quantity;
            }
            return sub
        });

        if (subProducts) {
            const modified = CartsDaoMongo.modifiedProductToCart({
                idCart,
                subProducts,
            });
            return modified;
        }
        return undefined;
    }
    static async clearCart(idCart:string){
        const subProducts:ICompleteSubProductToCart[] = []
        const deleted = await CartsDaoMongo.modifiedProductToCart({idCart,subProducts})
        return deleted
    }
    static async deleteProductOfCart({idCart,idSubProduct}:IIdsNecessaries){
        const cart =await CartsDaoMongo.getOneById(idCart)
        const subProducts = cart?.products
        if (subProducts) {
            // =-====-=-=-= VOY POR ACÁ =_=--=-=-=====-
            subProducts.splice(subProd => subProd._id == idSubProduct)
            const edited = await CartsDaoMongo.modifiedProductToCart({idCart,subProducts})
            return edited
        }
        return undefined
    }

}


interface IProductOfCart {
    idSubProduct: string;
    idCart: string;
    quantity: number;
}
interface IIdsNecessaries {
    idSubProduct: string;
    idCart: string;
}