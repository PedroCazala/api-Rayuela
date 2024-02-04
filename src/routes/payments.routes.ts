import {Router} from "express";
import { PaymentsController } from "../controllers/payments.controller";
const PaymentsRoutes = Router()
PaymentsRoutes.post('/create-order',PaymentsController.createOrder)

PaymentsRoutes.get('/success',(req,res)=>{
    res.send('success')
})
PaymentsRoutes.get('/failure',(req,res)=>{
    res.send('failure')
})
PaymentsRoutes.get('/pending',(req,res)=>{
    res.send('pending')
})

PaymentsRoutes.post('/webhook',PaymentsController.receiveWebhook)

export {PaymentsRoutes}