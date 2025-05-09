import mongoose from "mongoose";
import { IProduct, ISubProduct } from "../interfaces/products.interface";

const productsCollection = "Products";
export const subProductsCollection = "subProducts";

const productsSchema = new mongoose.Schema<IProduct>({
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
            type: mongoose.Types.ObjectId,
            ref: subProductsCollection,
            required: true,
        },
    ],
});
const subProductsSchema = new mongoose.Schema<ISubProduct>({
    img: [{ type: String, required: true }],
    barcode: { type: String },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    IDProduct: { type: mongoose.Types.ObjectId, ref: productsCollection },
});
export const subProductsSchemaForOrder = new mongoose.Schema<ISubProduct>({
    img: [{ type: String, required: true }],
    barcode: { type: String },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
    IDProduct: { type: productsSchema },
});

export const ProductModel = mongoose.model<IProduct>(
    productsCollection,
    productsSchema
);
export const SubProductsModel = mongoose.model<ISubProduct>(
    subProductsCollection,
    subProductsSchema
);
