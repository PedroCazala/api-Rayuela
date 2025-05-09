"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubProductsController = void 0;
const sub_products_services_1 = require("../services/sub-products.services");
// import { IProduct } from "../interfaces/products.interface";
class SubProductsController {
    static getSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const subProduct = yield sub_products_services_1.SubProductsService.getOneSubProduct(id);
                subProduct
                    ? res.status(200).json(subProduct)
                    : res.status(404).json(`SubProduct with id: ${id}, don't exist`);
            }
        });
    }
    static updateSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSubProduct } = req.params;
            const newData = req.body;
            try {
                const subProduct = yield sub_products_services_1.SubProductsService.updateSubProduct({ idSubProduct, newData });
                if (subProduct) {
                    res.status(200).json({
                        message: `SubProduct with id: ${idSubProduct} was modified`, subProduct,
                    });
                }
                else {
                    res.status(404).json({
                        message: `SubProduct with id: ${idSubProduct} was not found`,
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    message: `SubProduct with id: ${idSubProduct} was not found`,
                    error
                });
            }
        });
    }
    static deleteSubProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSubProduct } = req.params;
            if (!idSubProduct) {
                return res.status(400).json({
                    message: "ID del subproducto no proporcionado.",
                });
            }
            try {
                const subProduct = yield sub_products_services_1.SubProductsService.deleteSubProduct(idSubProduct);
                if (subProduct) {
                    return res.status(200).json({
                        message: `Subproducto con id: ${idSubProduct} fue eliminado correctamente.`,
                        subProduct,
                    });
                }
                else {
                    return res.status(404).json({
                        message: `Subproducto con id: ${idSubProduct} no fue encontrado.`,
                    });
                }
            }
            catch (error) {
                console.error(`Error al eliminar el subproducto con id: ${idSubProduct}`, error);
                return res.status(500).json({
                    message: `Error interno del servidor al intentar eliminar el subproducto con id: ${idSubProduct}.`,
                    error: error,
                });
            }
        });
    }
}
exports.SubProductsController = SubProductsController;
