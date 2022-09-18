"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
class ProductsController {
    static getProducts(req, res) {
        const id = req.params.id;
        if (id) {
            res.send(id);
        }
        else {
            res.send('no existe id');
        }
    }
}
exports.ProductsController = ProductsController;
