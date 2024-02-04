"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subProducts_controller_1 = require("../controllers/subProducts.controller");
const SubProductsRoutes = express_1.default.Router();
exports.SubProductsRoutes = SubProductsRoutes;
SubProductsRoutes.get('/:id', (req, res) => {
    subProducts_controller_1.SubProductsController.getSubProduct(req, res);
});
SubProductsRoutes.put('/:idSubProduct', subProducts_controller_1.SubProductsController.updateSubProduct);
