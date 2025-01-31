import {
    ICompleteProduct,
    IProduct,
    ISubProduct,
} from "../interfaces/products.interface";
import { ProductsService } from "../services/products.services";
import { Request, Response /*, NextFunction */ } from "express";
import { SubProductsService } from "../services/sub-products.services";
// import { IProduct } from "../interfaces/products.interface";

export class ProductsController {
    static async getProducts(req: Request, res: Response) {
        const {id} = req.params;
        if (id) {
            const product = await ProductsService.getOneProduct(id);
            product
                ? res.status(200).json(product)
                : res.status(404).json(`Product with id: ${id}, don't exist`);
        } else {
            let {sort} = req.query;
            
            let products;
            if (sort === 'SortByMinorPrice') {
                products =
                await ProductsService.getAllProductsSortByMinorPrice();
            } else if (sort === 'SortByMajorPrice') {
                products =
                await ProductsService.getAllProductsSortByMajorPrice();
            } else {
                products = await ProductsService.getAllProductsSortByName();
            }
            products[0]
                ? res.status(200).json(products)
                : res
                      .status(404)
                      .json({ message: `No found products in database` });
        }
    }
    static async getSubProductsOfAProduct(req: Request, res: Response) {
        const id = req.params.id;
        const subProducts = await ProductsService.getSubProductsOfAProduct(id);

        subProducts
            ? res.status(200).json(subProducts)
            : res.status(404).json(`Product with id: ${id}, don't exist`);
    }
    static async getProductsForCategory(req: Request, res: Response) {
        const category = req.params.category;
        let {sort} = req.query;
            
        let products;
        if (sort === 'SortByMinorPrice') {
            products =
            await ProductsService.getForCategorySortByMinorPrice(category);
        } else if (sort === 'SortByMajorPrice') {
            products =
            await ProductsService.getForCategorySortByMajorPrice(category);
        } else {
            console.log('entro al else');
            products = await ProductsService.getForCategorySortByName(category);
        }
        products
            ? res.status(200).json(products)
            : res.status(404).json({
                  message: `No found products with category: ${category} in database`,
              });
    }
    static async getProductsForBrand(req: Request, res: Response) {
        const brand = req.params.brand;
        let {sort} = req.query;
            
        let products;
        if (sort === 'SortByMinorPrice') {
            products =
            await ProductsService.getForBrandSortByMinorPrice(brand);
        } else if (sort === 'SortByMajorPrice') {
            products =
            await ProductsService.getForBrandSortByMajorPrice(brand);
        } else {
            console.log('entro al else');
            products = await ProductsService.getForBrandSortByName(brand);
        }
        products
            ? res.status(200).json(products)
            : res.status(404).json({
                  message: `No found products with brand: ${brand} in database`,
              });
    }
    static async createProduct(req: Request, res: Response) {
        const data: ICompleteProduct = req.body;
        console.log("data de create Product en products.controller", data);

        try {
            const subProducts = await SubProductsService.createSubProducts(
                data.subProducts
            );
            let IDSubProds: string[] = [];
            subProducts.forEach(
                (sub) => (IDSubProds = [...IDSubProds, sub._id])
            );

            const product = await ProductsService.createProduct({
                ...data,
                IDSubProducts: IDSubProds,
            });
            subProducts.forEach(async (sub: ISubProduct) => {
                await SubProductsService.updateSubProduct({
                    idSubProduct: sub._id,
                    newData: { sub, IDProduct: product._id },
                });
            });
            subProducts &&
                res.status(200).json({
                    // product,
                    // subProducts,
                    message1: `El producto se creó con el id: ${product._id}`,
                    message2: `Los subproductos fueron creados con los id: ${IDSubProds}`,
                });
        } catch (error) {
            res.status(500).json({ message: `error`, error });
        }
    }
    static async addMoreSubProduct(req: Request, res: Response) {
        // funciona -- recibir los subprod y el id del prod---
        const data: { idProduct: string; subProducts: ISubProduct[] } = req.body;
        // console.log("data de create Product en products.controller", {dataid:data.idProduct,datasubprdo:data.subProducts});

        try {
            // funciona ---- crear los subprod -----
            const subProducts = await SubProductsService.createSubProducts(
                data.subProducts
            );
            let IDSubProds: string[] = [];
            subProducts.forEach(
                (sub) => ( IDSubProds.push(sub._id))
            );

            const product = await ProductsService.getOneProduct(data.idProduct)
            console.log({product});
            
            if(product){
                await ProductsService.addIDSubProductToProduct({idProduct:data.idProduct,arrayIdsSub:IDSubProds})
                
                //funciona --- agregar el id dedel prod a los subprod ---
                subProducts.forEach(async (sub: ISubProduct) => {
                    await SubProductsService.updateSubProduct({
                        idSubProduct: sub._id,
                        newData: { sub, IDProduct: data.idProduct },
                    });
                });
                subProducts &&
                    res.status(200).json({
                        // product,
                        // subProducts,
                        message1: `El producto se editó con el id: ${data.idProduct}`,
                        message2: `Los subproductos fueron creados con los id: ${IDSubProds}`,
                        // prod:{}
                    });
            }
        } catch (error) {
            res.status(500).json({ message: `error`, error });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        const { idProduct } = req.params;
        const newData = req.body;
        try {
            const product = await ProductsService.updateProduct({
                idProduct,
                newData,
            });
            if (product) {
                res.status(200).json({
                    message: `Product with id: ${idProduct} was modified`,
                    product,
                });
            } else {
                res.status(404).json({
                    message: `Product with id: ${idProduct} was not found`,
                });
            }
        } catch (error) {
            res.status(404).json({
                message: `Product with id: ${idProduct} was not found`,
                error,
            });
        }
    }
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
    static async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const subProds = await ProductsService.getSubProductsOfAProduct(id);
            subProds &&
                subProds.map(async (sub) => {
                    await SubProductsService.deleteSubProduct(sub._id);
                });

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
                error,
            });
        }
    }
}
