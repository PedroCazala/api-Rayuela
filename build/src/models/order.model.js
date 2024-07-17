"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.orderCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.orderCollection = "Orders";
const OrderSchema = new mongoose_1.default.Schema({
    creationDate: { type: Date, required: true },
    cartId: { type: mongoose_1.default.Schema.Types.ObjectId },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId },
    cartProducts: {
        type: [
            {
                subProduct: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "subProducts",
                    required: true,
                },
                _id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
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
        enum: ["Orden-creada", "En-preparación", "En-camino", "recibida"],
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
exports.OrderModel = mongoose_1.default.model(exports.orderCollection, OrderSchema);
