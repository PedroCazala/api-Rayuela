import { Request, Response /*, NextFunction */ } from "express";
import { SubProductsService } from "../services/sub-products.services";
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
        }
        static async updateSubProduct(req: Request, res: Response) {
            const {idSubProduct} = req.params;
            const newData = req.body;
            try {
                const subProduct = await SubProductsService.updateSubProduct({idSubProduct,newData});
                if (subProduct) {
                    res.status(200).json({
                        message: `SubProduct with id: ${idSubProduct} was modified`,subProduct,
                    });
                } else {
                    res.status(404).json({
                        message: `SubProduct with id: ${idSubProduct} was not found`,
                    });
                }
            } catch (error) {
                res.status(404).json({
                    message: `SubProduct with id: ${idSubProduct} was not found`,
                    error
                });

            }
        }
}
