import express from 'express'
import { SubProductsController } from '../controllers/sub-products.controller'

const SubProductsRoutes = express.Router()
SubProductsRoutes.get('/:id',(req,res)=>{    
    SubProductsController.getSubProduct(req,res)
})
SubProductsRoutes.put('/:idSubProduct',SubProductsController.updateSubProduct)
export {SubProductsRoutes}