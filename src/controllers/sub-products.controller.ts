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
        static async deleteSubProduct(req: Request, res: Response) {
            const { idSubProduct } = req.params;
        
            if (!idSubProduct) {
                return res.status(400).json({
                    message: "ID del subproducto no proporcionado.",
                });
            }
        
            try {
                const subProduct = await SubProductsService.deleteSubProduct(idSubProduct);
        
                if (subProduct) {
                    return res.status(200).json({
                        message: `Subproducto con id: ${idSubProduct} fue eliminado correctamente.`,
                        subProduct,
                    });
                } else {
                    return res.status(404).json({
                        message: `Subproducto con id: ${idSubProduct} no fue encontrado.`,
                    });
                }
            } catch (error) {
                console.error(`Error al eliminar el subproducto con id: ${idSubProduct}`, error);
                return res.status(500).json({
                    message: `Error interno del servidor al intentar eliminar el subproducto con id: ${idSubProduct}.`,
                    error: error, 
                });
            }
        }
}
