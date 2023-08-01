"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubProductsModel = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = 'Products';
const subProductsCollection = 'subProducts';
const productsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, require: true },
    brand: { type: String },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    size: { type: Number },
    weight: { type: Number },
    IDSubProducts: [{ type: mongoose_1.default.Types.ObjectId, ref: subProductsCollection }],
});
const subProductsSchema = new mongoose_1.default.Schema({
    img: [{ type: String, required: true }],
    barcode: { type: String },
    color: { type: String, required: true },
    quantity: { type: Number },
    stock: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    _id: { type: String, required: true }
});
exports.ProductModel = mongoose_1.default.model(productsCollection, productsSchema);
exports.SubProductsModel = mongoose_1.default.model(subProductsCollection, subProductsSchema);
