import express from "express";
import { OrdersController } from "../controllers/order.controller";
import { passport } from "../auth/auth";


const OrdersRoutes = express.Router();
OrdersRoutes.get("/:idOrder?", passport.authenticate("jwt-admin", { session: false }),(req, res) => {
    OrdersController.get(req, res);
});
OrdersRoutes.get("/:idOrderMP", passport.authenticate("jwt-admin", { session: false }),(req, res) => {
    OrdersController.getByIdMP(req, res);
});
OrdersRoutes.get("/state/:state",passport.authenticate("jwt-admin", { session: false }), (req, res) => {
    OrdersController.getByState(req, res);
});
OrdersRoutes.put("/:idOrder/state/:state",passport.authenticate("jwt-admin", { session: false }), (req, res) => {
    OrdersController.getEditeState(req, res);
});
export{OrdersRoutes}