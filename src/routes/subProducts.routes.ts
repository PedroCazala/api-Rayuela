import express from 'express'
import { SubProductsController } from '../controllers/subProducts.controller'

const SubProductsRoutes = express.Router()
SubProductsRoutes.get('/:id?',(req,res)=>{
    SubProductsController.getSubProducts(req,res)
})
export {SubProductsRoutes}