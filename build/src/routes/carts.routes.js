"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const carts_controller_1 = require("../controllers/carts.controller");
const CartsRoutes = express_1.default.Router();
exports.CartsRoutes = CartsRoutes;
CartsRoutes.post('/', (req, res) => {
    carts_controller_1.CartsController.createCart(req, res);
});
CartsRoutes.get('/:idCart', (req, res) => {
    carts_controller_1.CartsController.getCart(req, res);
});
CartsRoutes.post('/add-subproducts/:idCart', (req, res) => {
    carts_controller_1.CartsController.addSubProduct(req, res);
});
CartsRoutes.delete('/clear-cart/:idCart', (req, res) => {
    carts_controller_1.CartsController.clearCart(req, res);
});
CartsRoutes.delete('/deleteProductOfCart/:idCart', (req, res) => {
    carts_controller_1.CartsController.deleteProductOfCart(req, res);
});
CartsRoutes.delete('/:idCart', (req, res) => {
    carts_controller_1.CartsController.deleteCart(req, res);
});