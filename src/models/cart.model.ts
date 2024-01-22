import mongoose from "mongoose";
import { ICart } from "../interfaces/carts.interface";
import { userCollection } from "./user.model";
import { subProductsCollection } from "./product.model";
// import {userCollection} from './user.model';
// import { ICompleteProduct } from "../interfaces/products.interface";
const cartCollection = "Carts";

const CartsSchema = new mongoose.Schema<ICart>({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: userCollection,
        required: true,
    },
    creationDate: { type: Date, required: true },
    // products: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "subProducts",
    //         required: true,
    //     },
    // ],
    products:[{
        subProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subProducts",
            required: true,
        },
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subProducts",
            required: true,
        },
        quantity: { type: Number, required: true }
    }],

    // products: [
    //     {
    //         subProducts: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "subProducts",
    //             required: true,
    //         },
    //         quantity: { type: Number, required: true },
    //     },
    // ],

    lastModifiedDate: { type: Date },
});

export const CartModel = mongoose.model<ICart>(cartCollection, CartsSchema);
