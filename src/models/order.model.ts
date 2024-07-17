import mongoose from "mongoose";
import { IUser } from "../interfaces/users.interface";
import { IOrder } from "../interfaces/orders.interface";
export const orderCollection = "Orders";

const OrderSchema = new mongoose.Schema<IOrder>({
    creationDate: { type: Date, required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },
    cartProducts: {
        type: [
            {
                subProduct: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "subProducts",
                    required: true,
                },
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "subProducts",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
        required: true,
    },
    priceShipment: { type: Number, required: true },
    state: {
        type: String,
        enum: ["Orden-creada","En-preparación", "En-camino", "recibida"],
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
});

export const OrderModel = mongoose.model<IOrder>(orderCollection, OrderSchema);
