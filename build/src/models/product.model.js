"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsCollection = 'Products';
const productsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, require: true },
    brand: { type: String },
    creationDate: { type: Number, required: true },
    lastModifiedDate: { type: Number },
    types: [{
            img: [{ type: String, required: true }],
            barcode: { type: String },
            color: { type: String, required: true },
            quantity: { type: Number, required: true },
            stock: { type: Number, required: true },
            size: { type: Number },
            weight: { type: Number }
        }]
});
exports.ProductModel = mongoose_1.default.model(productsCollection, productsSchema);
