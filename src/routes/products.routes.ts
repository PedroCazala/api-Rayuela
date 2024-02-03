import express from "express";
import { ProductsController } from "../controllers/products.controller";
import { passport } from "../auth/auth";
import multer from "multer";

const ProductsRoutes = express.Router();
ProductsRoutes.get("/:id?", (req, res) => {
    ProductsController.getProducts(req, res);
});
ProductsRoutes.get("/subproducts/:id?", (req, res) => {
    ProductsController.getSubProductsOfAProduct(req, res);
});
ProductsRoutes.get("/category/:category", (req, res) => {
    ProductsController.getProductsForCategory(req, res);
});
ProductsRoutes.get("/brand/:brand", (req, res) => {
    ProductsController.getProductsForBrand(req, res);
});

const upload = multer({ storage: multer.memoryStorage() });
ProductsRoutes.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    upload.array("files-img-subProduct"),
    (req, res) => {
        ProductsController.createProduct(req, res);
    }
);
ProductsRoutes.put(
    "/:idProduct",
    passport.authenticate("jwt-admin", { session: false }),
    (req, res) => {
        ProductsController.updateProduct(req, res);
    }
);
// ProductsRoutes.put('/:idProduct/:idType',(req,res)=>{
//     ProductsController.updateTypeProduct(req,res)
// })
ProductsRoutes.delete(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    (req, res) => {
        ProductsController.deleteProduct(req, res);
    }
);

export { ProductsRoutes };
