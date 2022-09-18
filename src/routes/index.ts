import express from 'express'
import { ProductsRoutes } from './products.routes'

const IndexRouter = express.Router()
IndexRouter.use('/api/products',ProductsRoutes)
IndexRouter.get('/',(_,res)=>{
    res.status(200).json({message:'Api de Rayuela',documentation_swagger:'Aquí ira la url'})
})


IndexRouter.get('*',(_,res)=>{
    res.status(404).json({message:'La pagina no existe',status:404,index:'/'})
})
export {IndexRouter}