import express from 'express'
import { CartsController } from '../controllers/carts.controller'

const CartsRoutes = express.Router()
CartsRoutes.post('/',(req,res)=>{
    CartsController.createCart(req,res)
})
CartsRoutes.get('/:idCart',(req,res)=>{
    CartsController.getCart(req,res)
})
// CartsRoutes.post('/add-subproducts',(req,res)=>{
//     CartsController.addSubProduct(req,res)
// })
// CartsRoutes.get('/category/:category',(req,res)=>{
//     CartsController.getProductsForCategory(req,res)
// })
// CartsRoutes.get('/brand/:brand',(req,res)=>{
//     CartsController.getProductsForBrand(req,res)
// })

// CartsRoutes.post('/',(req,res)=>{
//     CartsController.createProduct(req,res)
// })
// CartsRoutes.put('/:idProduct',(req,res)=>{    
//     CartsController.updateProduct(req,res)
// })
// CartsRoutes.put('/:idProduct/:idType',(req,res)=>{    
//     CartsController.updateTypeProduct(req,res)
// })
CartsRoutes.delete('/:idCart',(req,res)=>{    
    CartsController.deleteCart(req,res)
})



export {CartsRoutes}