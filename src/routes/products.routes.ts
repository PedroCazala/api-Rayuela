import express from 'express'
import { ProductsController } from '../controllers/products.controller'

const ProductsRoutes = express.Router()
ProductsRoutes.get('/:id?',(req,res)=>{
    ProductsController.getProducts(req,res)
})

ProductsRoutes.post('/',(req,res)=>{
    ProductsController.createProduct(req,res)
})



export {ProductsRoutes}