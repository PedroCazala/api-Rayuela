"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const ProductsRoutes = express_1.default.Router();
exports.ProductsRoutes = ProductsRoutes;
ProductsRoutes.get('/:id?', (req, res) => {
    products_controller_1.ProductsController.getProducts(req, res);
});
ProductsRoutes.get('/subproducts/:id?', (req, res) => {
    products_controller_1.ProductsController.getSubProductsOfAProduct(req, res);
});
ProductsRoutes.get('/category/:category', (req, res) => {
    products_controller_1.ProductsController.getProductsForCategory(req, res);
});
ProductsRoutes.get('/brand/:brand', (req, res) => {
    products_controller_1.ProductsController.getProductsForBrand(req, res);
});
