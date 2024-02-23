import {Router} from "express";
import { PaymentsController } from "../controllers/payments.controller";
const PaymentsRoutes = Router()
PaymentsRoutes.post('/create-order',PaymentsController.createOrder)

PaymentsRoutes.get('/success',(_,res)=>{
    res.send('success')
})
PaymentsRoutes.get('/failure',(_,res)=>{
    res.send('failure')
})
PaymentsRoutes.get('/pending',(_,res)=>{
    res.send('pending')
})

PaymentsRoutes.post('/webhook',PaymentsController.receiveWebhook)

export {PaymentsRoutes}