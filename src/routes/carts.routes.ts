import express from "express";
import { CartsController } from "../controllers/carts.controller";
import { passport } from "../auth/auth";

const CartsRoutes = express.Router();
CartsRoutes.post("/", (req, res) => {
    CartsController.createCart(req, res);
});
CartsRoutes.get(
    "/:idCart",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        CartsController.getCart(req, res);
    }
);
CartsRoutes.post("/add-subproducts/:idCart", 
passport.authenticate("jwt", { session: false }),(req, res) => {
    CartsController.addSubProduct(req, res);
});

CartsRoutes.delete("/clear-cart/:idCart", passport.authenticate("jwt", { session: false }),(req, res) => {
    CartsController.clearCart(req, res);
});
CartsRoutes.delete("/delete-product-of-cart/:idCart", (req, res) => {
    CartsController.deleteProductOfCart(req, res);
});

CartsRoutes.delete("/:idCart", (req, res) => {
    CartsController.deleteCart(req, res);
});

export { CartsRoutes };
