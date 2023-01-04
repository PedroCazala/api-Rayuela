import { ProductsService } from "../services/products.services";
import { Request, Response /*, NextFunction */ } from "express";

export class ProductsController {
    static async getProducts(req: Request, res: Response) {
        const id = req.params.id;
        if (id) {
            const product = await ProductsService.getOneProduct(id);
            product
                ? res.status(200).json(product)
                : res.status(404).json(`Product with id: ${id}, don't exist`);
        } else {
            const products = await ProductsService.getAllProducts();
            products[0]
                ? res.status(200).json(products)
                : res.status(404).json({ message: `No found products in database` });
        }
    }
    static async getProductsForCategory(req: Request, res: Response) {
        const category = req.params.category;
        const products = await ProductsService.getForCategory(category);
        products
                ? res.status(200).json(products)
                : res.status(404).json({ message: `No found products with category: ${category} in database` });
    }
    static async getProductsForBrand(req: Request, res: Response) {
        const brand = req.params.brand;
        const products = await ProductsService.getForBrand(brand);
        products
                ? res.status(200).json(products)
                : res.status(404).json({ message: `No found products with brand: ${brand} in database` });
    }
    static async createProduct(req: Request, res: Response) {
        const data: object = req.body;
        try {
            const product = await ProductsService.createProduct(data);
            product &&  res.status(200).json({
                product,
                message: `El producto fué creado con el id ${product._id}`,
            });
        } catch (error) {
            res.status(500).json({ message: `error`, error });
        }
    }
    static async deleteProduct(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const product = await ProductsService.deleteProduct(id);
            if (product.deletedCount > 0) {
                res.status(200).json({
                    message: `Product with id: ${id} was deleted`,
                });
            } else {
                res.status(404).json({
                    message: `Product with id: ${id} was not found, it is probably that this product was delete before`,
                });
            }
        } catch (error) {
            res.status(404).json({
                message: `Product with id: ${id} was not found`,
                error
            });
        }
    }
}
