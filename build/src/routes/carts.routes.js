"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const CartsRoutes = express_1.default.Router();
exports.CartsRoutes = CartsRoutes;
CartsRoutes.get('/:id?', (req, res) => {
    products_controller_1.ProductsController.getProducts(req, res);
});
