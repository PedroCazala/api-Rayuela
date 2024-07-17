"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const OrdersRoutes = express_1.default.Router();
exports.OrdersRoutes = OrdersRoutes;
OrdersRoutes.get("/:idOrder?", (req, res) => {
    order_controller_1.OrdersController.get(req, res);
});
OrdersRoutes.get("/state/:state", (req, res) => {
    order_controller_1.OrdersController.getByState(req, res);
});
