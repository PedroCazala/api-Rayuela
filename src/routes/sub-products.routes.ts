import express from "express";
import { SubProductsController } from "../controllers/sub-products.controller";
import { passport } from "../auth/auth";

const SubProductsRoutes = express.Router();
SubProductsRoutes.get("/:id", (req, res) => {
    SubProductsController.getSubProduct(req, res);
});
SubProductsRoutes.put(
    "/:idSubProduct",
    passport.authenticate("jwt-admin", { session: false }),
    SubProductsController.updateSubProduct
);
SubProductsRoutes.delete(
    "/:idSubProduct",
    passport.authenticate("jwt-admin", { session: false }),
    SubProductsController.deleteSubProduct
);
export { SubProductsRoutes };
