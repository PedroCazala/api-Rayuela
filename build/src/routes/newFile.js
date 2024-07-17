"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_routes_1 = require("./orders.routes");
orders_routes_1.OrdersRoutes.get("/:id?", (req, res) => {
    OrdersController.get(req, res);
});
