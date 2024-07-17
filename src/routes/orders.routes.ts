import express from "express";
import { OrdersController } from "../controllers/order.controller";

const OrdersRoutes = express.Router();
OrdersRoutes.get("/:idOrder?", (req, res) => {
    OrdersController.get(req, res);
});
OrdersRoutes.get("/state/:state", (req, res) => {
    OrdersController.getByState(req, res);
});
export{OrdersRoutes}