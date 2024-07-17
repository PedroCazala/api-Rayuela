"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubProductsModel = exports.ProductModel = exports.subProductsCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = "Products";
exports.subProductsCollection = "subProducts";
const productsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    size: {
        long: { type: Number },
        width: { type: Number },
        height: { type: Number },
    },
    weight: { type: Number },
    discount: { type: Number },
    minimumStock: { type: Number },
    IDSubProducts: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: exports.subProductsCollection,
            required: true,
        },
    ],
});
const subProductsSchema = new mongoose_1.default.Schema({
    img: [{ type: String, required: true }],
    barcode: { type: String },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    IDProduct: { type: mongoose_1.default.Types.ObjectId, ref: productsCollection },
});
exports.ProductModel = mongoose_1.default.model(productsCollection, productsSchema);
exports.SubProductsModel = mongoose_1.default.model(exports.subProductsCollection, subProductsSchema);
