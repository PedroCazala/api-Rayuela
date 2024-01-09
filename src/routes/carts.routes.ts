import express from 'express'
import { CartsController } from '../controllers/carts.controller'

const CartsRoutes = express.Router()
CartsRoutes.post('/',(req,res)=>{
    CartsController.createCart(req,res)
})
CartsRoutes.get('/:idCart',(req,res)=>{
    CartsController.getCart(req,res)
})
CartsRoutes.post('/add-subproducts/:idCart',(req,res)=>{
    CartsController.addSubProduct(req,res)
})

CartsRoutes.delete('/clear-cart/:idCart',(req,res)=>{
    CartsController.clearCart(req,res)
})
CartsRoutes.delete('/deleteProductOfCart/:idCart',(req,res)=>{
    CartsController.deleteProductOfCart(req,res)
})

CartsRoutes.delete('/:idCart',(req,res)=>{    
    CartsController.deleteCart(req,res)
})



export {CartsRoutes}