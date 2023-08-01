import { Request, Response /*, NextFunction */ } from "express";
// import { IProduct } from "../interfaces/products.interface";

export class SubProductsController {
    static async getSubProduct(req: Request, res: Response) {
        const id = req.params.id;
        if (id) {
            const product = await SubProductsService.getOneProduct(id);
            product
                ? res.status(200).json(product)
                : res.status(404).json(`Product with id: ${id}, don't exist`);
        }
        // else {
        //     const products = await SubProductsService.getAllProducts();
        //     products[0]
        //         ? res.status(200).json(products)
        //         : res.status(404).json({ message: `No found products in database` });
        // }
    }

}
