import mongoose from "mongoose";
import { ICart } from "../interfaces/carts.interface";
import { userCollection } from "./user.model";

const cartCollection = "Carts";

const CartsSchema = new mongoose.Schema<ICart>({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: userCollection,
        required: true,
    },
    creationDate: { type: Date, required: true },
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
    shipment:{ type: Number},
    lastModifiedDate: { type: Date },
});

export const CartModel = mongoose.model<ICart>(cartCollection, CartsSchema);
