import mongoose from "mongoose";
import { ICompleteSubProductToCart } from "./products.interface";

export interface ICart {
    _id?: string;
    userId: mongoose.Schema.Types.ObjectId;
    // state:'inProgress'|'Enviado';
    creationDate: Date;
    lastModifiedDate?: Date;
    products:[ICompleteSubProductToCart] | [];
}