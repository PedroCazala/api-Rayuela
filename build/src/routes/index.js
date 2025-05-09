"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_routes_1 = require("./products.routes");
const sub_products_routes_1 = require("./sub-products.routes");
const carts_routes_1 = require("./carts.routes");
const user_routes_1 = require("./user.routes");
const files_routes_1 = require("./files.routes");
const payments_routes_1 = require("./payments.routes");
const orders_routes_1 = require("./orders.routes");
const frontent_redirect_routes_1 = require("./frontent-redirect.routes");
const mails_routes_1 = require("./mails.routes");
const IndexRouter = express_1.default.Router();
exports.IndexRouter = IndexRouter;
IndexRouter.use('/api/products', products_routes_1.ProductsRoutes);
IndexRouter.use('/api/subproducts', sub_products_routes_1.SubProductsRoutes);
IndexRouter.use('/api/carts', carts_routes_1.CartsRoutes);
IndexRouter.use('/api/user', user_routes_1.UserRoutes);
IndexRouter.use('/api/files', files_routes_1.FilesRoutes);
IndexRouter.use('/api/payments', payments_routes_1.PaymentsRoutes);
IndexRouter.use('/api/orders', orders_routes_1.OrdersRoutes);
IndexRouter.use('/api/redirect', frontent_redirect_routes_1.FrontendRedirectRoute);
IndexRouter.use('/api/mail', mails_routes_1.MailRoutes);
IndexRouter.get('/', (_, res) => {
    res.status(200).json({ message: 'Api de Rayuela', documentation_swagger: 'Aquí ira la url - creo que no porque pasaré todo a graphql' });
});
IndexRouter.get('*', (_, res) => {
    res.status(404).json({ message: 'La pagina no existe', status: 404, index: '/' });
});
