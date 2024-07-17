import express from 'express'
import { ProductsRoutes } from './products.routes'
import { SubProductsRoutes } from './sub-products.routes'
import { CartsRoutes } from './carts.routes'
import { UserRoutes } from './user.routes'
import { FilesRoutes } from './files.routes'
import { PaymentsRoutes } from './payments.routes'
import { OrdersRoutes } from './orders.routes'

const IndexRouter = express.Router()
IndexRouter.use('/api/products',ProductsRoutes)
IndexRouter.use('/api/subproducts',SubProductsRoutes)
IndexRouter.use('/api/carts',CartsRoutes)
IndexRouter.use('/api/user',UserRoutes)
IndexRouter.use('/api/files',FilesRoutes)
IndexRouter.use('/api/payments',PaymentsRoutes)
IndexRouter.use('/api/orders',OrdersRoutes)

IndexRouter.get('/',(_,res)=>{
    res.status(200).json({message:'Api de Rayuela',documentation_swagger:'Aquí ira la url'})
})


IndexRouter.get('*',(_,res)=>{
    res.status(404).json({message:'La pagina no existe',status:404,index:'/'})
})
export {IndexRouter} 