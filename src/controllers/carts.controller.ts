// import { ICompleteProduct } from "../interfaces/products.interface";
import { CartsServices } from "../services/carts.services";
import { Request, Response /*, NextFunction */ } from "express";
// import { SubProductsService } from "../services/subProducts.services";
// import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";

export class CartsController {
    static async createCart(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const cart = await CartsServices.create(userId);
            res.status(200).json({ message: `carrito creado`, cart });
        } catch (error) {
            res.status(500).json({
                message: "No se pudo crear el carrito",
                error,
            });
        }
    }
    static async getCart(req: Request, res: Response) {
        const { idCart } = req.params;

        console.log("el id del carro que se busca es: ", idCart);

        try {
            const cart = await CartsServices.getCart(idCart);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({
                message: "No se pudo crear el carrito",
                error,
            });
        }
    }
    static async deleteCart(req: Request, res: Response) {
        const { idCart } = req.params;
        try {
            await CartsServices.delete(idCart);
            res.status(200).json({
                message: `Se borró el carrito con el id: ${idCart}.`,
            });
        } catch (error) {
            console.log("entro al catch");
            res.status(500).json({
                message: "No se pudo eliminar el carrito",
                error,
            });
        }
    }
    static async addSubProduct(req: Request, res: Response) {
        const { idCart } = req.params;
        const { idSubProduct, quantity } = req.body;
        try {
            const SubProductAddedOrModified =
            await CartsServices.addProductToCart({
                idCart,
                idSubProduct,
                quantity,
            });
            SubProductAddedOrModified
            ? res.status(200).json({ SubProductAddedOrModified })
            : res.status(500).json({
                message: "No se pudo agragar el subProd al cart",
            });
        } catch (error) {
            res.status(500).json({
                message: "No se pudo agragar el subProd al cart",
                error,
            });
        }
    }
    static async clearCart(req: Request, res: Response) {
        const { idCart } = req.params;
        try {
            await CartsServices.clearCart(idCart)
            res.status(200).json({  message: `Se vació el cart con id: ${idCart}` })
        } catch (error) {
            res.status(500).json({
                message: `No se pudo vaciar el cart con id: ${idCart}`,
                error,
            });
        }
    }
    static async deleteProductOfCart(req: Request, res: Response) {
        const { idCart } = req.params;
        const { idSubProduct } = req.body;
        try {
            const deleted = await CartsServices.deleteProductOfCart({idCart,idSubProduct})
            deleted?
            res.status(200).json({  message: `Se borró el subProd: ${idSubProduct} del cart ${idCart}` })
            :
            res.status(500).json({
                message: `No se pudo borrar el subProd: ${idSubProduct} del cart ${idCart}`,
            });
        } catch (error) {
            res.status(500).json({
                message: `No se pudo borrar el subProd: ${idSubProduct} del cart ${idCart}`,
                error,
            });
        }
    }
}
