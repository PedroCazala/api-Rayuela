"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
/**
 * name
 * description
 * price
 * category
 * creationDate
 * lastModifiedDate
 * size
 * weight
 * type
 *      img
 *      stock
 *      barcode
 *      color
 *      quantity
 *      design
 */
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = 'Products';
const typeOfProductSchema = new mongoose_1.default.Schema({
    color: { type: String }
});
const productsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: [mongoose_1.default.Types.ObjectId], required: true }
});
exports.ProductModel = mongoose_1.default.model(productsCollection, productsSchema);
