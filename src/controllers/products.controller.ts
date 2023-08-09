import { ProductsService } from "../services/products.services";
import { Request, Response /*, NextFunction */ } from "express";
// import { IProduct } from "../interfaces/products.interface";

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
    static async getSubProductsOfAProduct(req: Request, res: Response){
        const id =req.params.id
        const subProducts =await ProductsService.getSubProductsOfAProduct(id)

        subProducts
        ? res.status(200).json(subProducts)
        : res.status(404).json(`Product with id: ${id}, don't exist`);
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
//     static async createProduct(req: Request, res: Response) {
//         const data: IProduct = req.body;
//         try {
//             const product = await ProductsService.createProduct(data);
//             product &&  res.status(200).json({
//                 product,
//                 message: `El producto fué creado con el id ${product._id}`,
//             });
//         } catch (error) {
//             res.status(500).json({ message: `error`, error });
//         }
//     }
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
//     static async updateTypeProduct(req: Request, res: Response) {
//         const {idProduct,idType} = req.params;
//         const newData = req.body;
//         console.log('hjola');
        
//         try {
//             const product = await ProductsService.updateTypeProduct({idProduct,idType,newData});            

//             res.status(200).json({
//                 message: `Product with id: ${idProduct} was modified`,product,
//             });
//         } catch (error) {
            
//             res.status(404).json({
//                 message: `Product with id: ${idProduct} was not found`,
//                 error
//             });
            
//         }
//     }
//     static async deleteProduct(req: Request, res: Response) {
//         const {id} = req.params;
//         try {
//             const product = await ProductsService.deleteProduct(id);
//             if (product.deletedCount > 0) {
//                 res.status(200).json({
//                     message: `Product with id: ${id} was deleted`,
//                 });
//             } else {
//                 res.status(404).json({
//                     message: `Product with id: ${id} was not found, it is probably that this product was delete before`,
//                 });
//             }
//         } catch (error) {
//             res.status(404).json({
//                 message: `Product with id: ${id} was not found`,
//                 error
//             });
//         }
//     }
}
