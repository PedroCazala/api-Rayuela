// import { ICompleteProduct } from "../interfaces/products.interface";
import { CartsServices } from "../services/carts.services";
import { Request, Response /*, NextFunction */ } from "express";
// import { SubProductsService } from "../services/subProducts.services";
// import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";

export class CartsController {
    static async createCart(req: Request, res: Response) {
        const {userId} = req.body;

        try {
            const cart = await CartsServices.create(userId);
            res.status(200).json({ message: `carrito creado`, cart});
        } catch (error){
            res.status(500).json({ message: "No se pudo crear el carrito" ,error});
        }
    }
    static async getCart(req: Request, res: Response) {
        const {idCart} = req.params;

        console.log('el id del carro que se busca es: ',idCart);
        
        try {
            const cart = await CartsServices.getCart(idCart);
            res.status(200).json(cart);
        } catch (error){
            res.status(500).json({ message: "No se pudo crear el carrito" ,error});
        }
    }
    static async deleteCart(req:Request,res:Response){
        const {idCart} = req.params
        try {
            await CartsServices.delete(idCart)
            res.status(200).json({message:`Se borró el carrito con el id: ${idCart}.`})
        } catch (error) {
            console.log('entro al catch');
            res.status(500).json({ message: "No se pudo eliminar el carrito" ,error});
        }
    }
    static async addSubProduct(req: Request, res: Response){
        const {idCart} = req.params;
        const {idSubProduct, quantity} = req.body;
        try {
            const SubProductAddedOrModified = await CartsServices.addProductToCart({idCart,idSubProduct,quantity})
            res.status(200).json({SubProductAddedOrModified})
        } catch (error) {
            res.status(500).json({message:'No se pudo agragar el subProd al cart',error})
        }
    }

    
    // static async getProducts(req: Request, res: Response) {
    //     const id = req.params.id;
    //     if (id) {
    //         const product = await ProductsService.getOneProduct(id);
    //         product
    //             ? res.status(200).json(product)
    //             : res.status(404).json(`Product with id: ${id}, don't exist`);
    //     } else {
    //         const products = await ProductsService.getAllProducts();
    //         products[0]
    //             ? res.status(200).json(products)
    //             : res
    //                   .status(404)
    //                   .json({ message: `No found products in database` });
    //     }
    // }
    // static async getSubProductsOfAProduct(req: Request, res: Response) {
    //     const id = req.params.id;
    //     const subProducts = await ProductsService.getSubProductsOfAProduct(id);

    //     subProducts
    //         ? res.status(200).json(subProducts)
    //         : res.status(404).json(`Product with id: ${id}, don't exist`);
    // }
    // static async getProductsForCategory(req: Request, res: Response) {
    //     const category = req.params.category;
    //     const products = await ProductsService.getForCategory(category);
    //     products
    //         ? res.status(200).json(products)
    //         : res.status(404).json({
    //               message: `No found products with category: ${category} in database`,
    //           });
    // }
    // static async getProductsForBrand(req: Request, res: Response) {
    //     const brand = req.params.brand;
    //     const products = await ProductsService.getForBrand(brand);
    //     products
    //         ? res.status(200).json(products)
    //         : res.status(404).json({
    //               message: `No found products with brand: ${brand} in database`,
    //           });
    // }
    // static async createProduct(req: Request, res: Response) {

    //     const data: ICompleteProduct = req.body;
    //     console.log('entro a crear producto',data);
    //     try {
    //         const subProducts = await SubProductsService.createSubProducts(
    //             data.subProducts
    //         );
    //         let IDSubProds: string[] = [];
    //         subProducts.forEach(
    //             (sub) => (IDSubProds = [...IDSubProds, sub._id])
    //         );

    //         const product = await ProductsService.createProduct({
    //             ...data,
    //             IDSubProducts: IDSubProds,
    //         });

    //         subProducts &&
    //             res.status(200).json({
    //                 // product,
    //                 // subProducts,
    //                 message1: `El producto se creó con el id: ${product._id}`,
    //                 message2: `Los subproductos fueron creados con los id: ${IDSubProds}`,
    //             });
    //     } catch (error) {

    //         res.status(500).json({ message: `error`, error });
    //     }
    // }

    //     static async updateProduct(req: Request, res: Response) {
    //         const {idProduct} = req.params;
    //         const newData = req.body;
    //         try {
    //             const product = await ProductsService.updateProduct({idProduct,newData});
    //             if (product) {
    //                 res.status(200).json({
    //                     message: `Product with id: ${idProduct} was modified`,product,
    //                 });
    //             } else {
    //                 res.status(404).json({
    //                     message: `Product with id: ${idProduct} was not found`,
    //                 });
    //             }
    //         } catch (error) {
    //             res.status(404).json({
    //                 message: `Product with id: ${idProduct} was not found`,
    //                 error
    //             });

    //         }
    //     }
    // //     static async updateTypeProduct(req: Request, res: Response) {
    // //         const {idProduct,idType} = req.params;
    // //         const newData = req.body;
    // //         console.log('hjola');

    // //         try {
    // //             const product = await ProductsService.updateTypeProduct({idProduct,idType,newData});

    // //             res.status(200).json({
    // //                 message: `Product with id: ${idProduct} was modified`,product,
    // //             });
    // //         } catch (error) {

    // //             res.status(404).json({
    // //                 message: `Product with id: ${idProduct} was not found`,
    // //                 error
    // //             });

    // //         }
    // //     }
    // static async deleteProduct(req: Request, res: Response) {
    //     const { id } = req.params;
    //     try {
    //         const subProds = await ProductsService.getSubProductsOfAProduct(id);
    //         subProds &&
    //             subProds.map(async(sub) => {
    //                 await SubProductsService.deleteSubProduct(sub._id)
    //             });

    //         const product = await ProductsService.deleteProduct(id);
    //         if (product.deletedCount > 0) {
    //             res.status(200).json({
    //                 message: `Product with id: ${id} was deleted`,
    //             });
    //         } else {
    //             res.status(404).json({
    //                 message: `Product with id: ${id} was not found, it is probably that this product was delete before`,
    //             });
    //         }
    //     } catch (error) {
    //         res.status(404).json({
    //             message: `Product with id: ${id} was not found`,
    //             error,
    //         });
    //     }
    // }
}
