"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import {userCollection} from './user.model';
// import { ICompleteProduct } from "../interfaces/products.interface";
const cartCollection = 'Carts';
const CartsSchema = new mongoose_1.default.Schema({
    // userId:  [{ type: mongoose.Types.ObjectId, ref: userCollection, required:true }],
    userId: { type: String, required: true },
    creationDate: { type: Date, required: true },
    products: { type: [] },
    lastModifiedDate: { type: Date },
});
exports.CartModel = mongoose_1.default.model(cartCollection, CartsSchema);
