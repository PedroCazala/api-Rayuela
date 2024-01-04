import express from 'express'
import { ProductsController } from '../controllers/products.controller'

const CartsRoutes = express.Router()
CartsRoutes.get('/:id?',(req,res)=>{
    ProductsController.getProducts(req,res)
})
// CartsRoutes.get('/subproducts/:id?',(req,res)=>{
//     ProductsController.getSubProductsOfAProduct(req,res)
// })
// CartsRoutes.get('/category/:category',(req,res)=>{
//     ProductsController.getProductsForCategory(req,res)
// })
// CartsRoutes.get('/brand/:brand',(req,res)=>{
//     ProductsController.getProductsForBrand(req,res)
// })

// CartsRoutes.post('/',(req,res)=>{
//     ProductsController.createProduct(req,res)
// })
// CartsRoutes.put('/:idProduct',(req,res)=>{    
//     ProductsController.updateProduct(req,res)
// })
// CartsRoutes.put('/:idProduct/:idType',(req,res)=>{    
//     ProductsController.updateTypeProduct(req,res)
// })
// CartsRoutes.delete('/:id',(req,res)=>{    
//     ProductsController.deleteProduct(req,res)
// })



export {CartsRoutes}