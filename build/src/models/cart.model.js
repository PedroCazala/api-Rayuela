"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
// import {userCollection} from './user.model';
// import { ICompleteProduct } from "../interfaces/products.interface";
const cartCollection = "Carts";
const CartsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: user_model_1.userCollection,
        required: true,
    },
    creationDate: { type: Date, required: true },
    products: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "subProducts",
            required: true,
            quantity: { type: Number, required: true }
        },
    ],
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
exports.CartModel = mongoose_1.default.model(cartCollection, CartsSchema);
