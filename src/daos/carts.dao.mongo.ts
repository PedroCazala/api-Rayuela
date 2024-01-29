import { ICart } from "../interfaces/carts.interface";
import {
    ICartProduct,
} from "../interfaces/products.interface";
import { CartModel } from "../models/cart.model";

export class CartsDaoMongo {
    // // Traer un carrito
    static async getOneById(id: String) {
        const cart = await CartModel.findOne({ _id: id })
        .populate({
            path: 'products.subProduct',
            model: 'subProducts', // Nombre de la colección de subproductos
            populate: {
                path: 'IDProduct',
                model: 'Products', // Nombre de la colección de productos
                // select: 'name description price', // Campos que deseas incluir
            },
        }) 
        .lean();
    
        return cart;
    }
    static async createCart(newCart: ICart) {
        const cart = await CartModel.create(newCart);
        return cart;
    }
    static async deleteCart(idCart: string) {
        const cart = await CartModel.deleteOne({ _id: idCart });
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
    static async modifiedProductToCart({ idCart, subProducts }: IModifiedProductOfCart) {
        // const updated = await CartModel.findOneAndUpdate({_id:idCart},cart)
        const updated =  await CartModel.findOneAndUpdate(
            { _id: idCart },
            { products: subProducts } 
        )
        return updated;
    }


}

interface IAddSubProduct {
    idCart: string;
    subProduct: ICartProduct;
}
interface IModifiedProductOfCart {
    idCart: string;
    subProducts: ICartProduct[];
}
