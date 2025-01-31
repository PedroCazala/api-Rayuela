import mongoose from "mongoose";
import { IOrder } from "../interfaces/orders.interface";
import { userCollection } from "./user.model";
import { SubProductsModel, subProductsSchemaForOrder } from "./product.model";
export const orderCollection = "Orders";

const OrderSchema = new mongoose.Schema<IOrder>({
    creationDate: { type: Date, required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: userCollection,
        // required: true,
    },
    cartProducts: {
        type: [
            {
                subProduct: {
                    type: subProductsSchemaForOrder,
                    // type: mongoose.Schema.Types.ObjectId,
                    // ref: "subProducts",
                    required: true,
                },
                // _id: {
                //     type: mongoose.Schema.Types.ObjectId,
                //     ref: "subProducts",
                //     required: true,
                // },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        required: true,
    },
    state: {
        type: String,
        enum: ["Orden-creada", "En-preparación", "En-camino", "recibida"],
        required: true,
    },
    priceShipment: { type: Number, required: true },
    typeOfShipment: {
        type: String,
        enum: ["giles", "argentina", "retira"],
        required: true,
    },
    totalPrice: { type: Number, required: true },
    totalPriceOfProducts: { type: Number, required: true },
    userDirection: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        prov: { type: String, required: true },
        CP: { type: Number, required: true },
    },
    // externalReference:{ type: String, required: true },
});

export const OrderModel = mongoose.model<IOrder>(orderCollection, OrderSchema);
