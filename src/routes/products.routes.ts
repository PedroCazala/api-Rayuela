import express from 'express'
import { ProductsController } from '../controllers/products.controller'

const ProductsRoutes = express.Router()
ProductsRoutes.get('/:id?',(req,res)=>{
    ProductsController.getProducts(req,res)
})
ProductsRoutes.get('/category/:category',(req,res)=>{
    ProductsController.getProductsForCategory(req,res)
})
ProductsRoutes.get('/brand/:brand',(req,res)=>{
    ProductsController.getProductsForBrand(req,res)
})

ProductsRoutes.post('/',(req,res)=>{
    ProductsController.createProduct(req,res)
})
ProductsRoutes.delete('/:id',(req,res)=>{    
    ProductsController.deleteProduct(req,res)
})



export {ProductsRoutes}