import { ProductsService } from "../services/products.services"
import { Request, Response /*, NextFunction */ } from 'express';

export class ProductsController {
    static async getProducts (req:Request,res:Response){
        const id = req.params.id
        if(id){
            const product = await ProductsService.getOneProduct(id)
            product
                ? res.send(product)
                : res.send(`El producto con el id: ${id}, no existe`)
        }else{
            const products = await ProductsService.getAllProducts()
            if(products[0]){
                res.status(200).json(products)
            }else{
                res.status(404).json({message:`No found products in database`})
            }
        }
    }
    static async createProduct(req:Request,res:Response){
        console.log('holi');
        
        try {
            const data : object = req.body
            const product = await ProductsService.createProduct(data)
            
            res.status(200).json({product, message:`El producto fué creado con el id $ {product._id}`})
        } catch (error) {
            console.log('enttro al catch');
            
            res.status(500).json({message:`error`,error})
        }
    }
}