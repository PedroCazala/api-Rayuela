"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_routes_1 = require("./products.routes");
const subProducts_routes_1 = require("./subProducts.routes");
const carts_routes_1 = require("./carts.routes");
const IndexRouter = express_1.default.Router();
exports.IndexRouter = IndexRouter;
IndexRouter.use('/api/products', products_routes_1.ProductsRoutes);
IndexRouter.use('/api/subproducts', subProducts_routes_1.SubProductsRoutes);
IndexRouter.use('/api/carts', carts_routes_1.CartsRoutes);
IndexRouter.get('/', (_, res) => {
    res.status(200).json({ message: 'Api de Rayuela', documentation_swagger: 'Aquí ira la url' });
});
IndexRouter.get('*', (_, res) => {
    res.status(404).json({ message: 'La pagina no existe', status: 404, index: '/' });
});
