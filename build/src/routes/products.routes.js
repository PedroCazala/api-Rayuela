"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const auth_1 = require("../auth/auth");
const multer_1 = __importDefault(require("multer"));
const ProductsRoutes = express_1.default.Router();
exports.ProductsRoutes = ProductsRoutes;
ProductsRoutes.get("/:id?", (req, res) => {
    products_controller_1.ProductsController.getProducts(req, res);
});
ProductsRoutes.get("/subproducts/:id?", (req, res) => {
    products_controller_1.ProductsController.getSubProductsOfAProduct(req, res);
});
ProductsRoutes.get("/category/:category", (req, res) => {
    products_controller_1.ProductsController.getProductsForCategory(req, res);
});
ProductsRoutes.get("/brand/:brand", (req, res) => {
    products_controller_1.ProductsController.getProductsForBrand(req, res);
});
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
ProductsRoutes.post("/", auth_1.passport.authenticate("jwt-admin", { session: false }), upload.array("files-img-subProduct"), (req, res) => {
    products_controller_1.ProductsController.createProduct(req, res);
});
ProductsRoutes.post("/add-more-sub-product", auth_1.passport.authenticate("jwt-admin", { session: false }), upload.array("files-img-subProduct"), (req, res) => {
    products_controller_1.ProductsController.addMoreSubProduct(req, res);
});
ProductsRoutes.put("/:idProduct", auth_1.passport.authenticate("jwt-admin", { session: false }), (req, res) => {
    products_controller_1.ProductsController.updateProduct(req, res);
});
// ProductsRoutes.put('/:idProduct/:idType',(req,res)=>{
//     ProductsController.updateTypeProduct(req,res)
// })
ProductsRoutes.delete("/:id", auth_1.passport.authenticate("jwt-admin", { session: false }), (req, res) => {
    products_controller_1.ProductsController.deleteProduct(req, res);
});
