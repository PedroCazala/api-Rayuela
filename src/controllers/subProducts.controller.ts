import { Request, Response /*, NextFunction */ } from "express";
import { SubProductsService } from "../services/subProducts.services";
// import { IProduct } from "../interfaces/products.interface";

export class SubProductsController {
    static async getSubProduct(req: Request, res: Response) {
        const id = req.params.id;
        
        if (id) {
            const subProduct = await SubProductsService.getOneSubProduct(id);            
            subProduct
            ? res.status(200).json(subProduct)
            : res.status(404).json(`SubProduct with id: ${id}, don't exist`);
        }
        // else {
            //     const products = await SubProductsService.getAllProducts();
            //     products[0]
            //         ? res.status(200).json(products)
            //         : res.status(404).json({ message: `No found products in database` });
            // }
        }
        static async updateSubProduct(req: Request, res: Response) {
            const {idSubProduct} = req.params;
            const newData = req.body;
            try {
                const product = await SubProductsService.updateSubProduct({idSubProduct,newData});
                if (product) {
                    res.status(200).json({
                        message: `Product with id: ${idSubProduct} was modified`,product,
                    });
                } else {
                    res.status(404).json({
                        message: `Product with id: ${idSubProduct} was not found`,
                    });
                }
            } catch (error) {
                res.status(404).json({
                    message: `Product with id: ${idSubProduct} was not found`,
                    error
                });

            }
        }
}
