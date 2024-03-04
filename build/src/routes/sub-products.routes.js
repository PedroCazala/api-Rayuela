"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sub_products_controller_1 = require("../controllers/sub-products.controller");
const auth_1 = require("../auth/auth");
const SubProductsRoutes = express_1.default.Router();
exports.SubProductsRoutes = SubProductsRoutes;
SubProductsRoutes.get("/:id", (req, res) => {
    sub_products_controller_1.SubProductsController.getSubProduct(req, res);
});
SubProductsRoutes.put("/:idSubProduct", auth_1.passport.authenticate("jwt-admin", { session: false }), sub_products_controller_1.SubProductsController.updateSubProduct);
