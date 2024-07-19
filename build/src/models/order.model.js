"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.orderCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const product_model_1 = require("./product.model");
exports.orderCollection = "Orders";
const OrderSchema = new mongoose_1.default.Schema({
    creationDate: { type: Date, required: true },
    cartId: { type: mongoose_1.default.Schema.Types.ObjectId },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: user_model_1.userCollection,
        // required: true,
    },
    cartProducts: {
        type: [
            {
                subProduct: {
                    type: product_model_1.subProductsSchemaForOrder,
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
    // externalReference:{ type: String, required: true },
});
exports.OrderModel = mongoose_1.default.model(exports.orderCollection, OrderSchema);
