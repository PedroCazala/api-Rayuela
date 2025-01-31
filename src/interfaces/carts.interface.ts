import mongoose from "mongoose";
import { ICartProduct } from "./products.interface";

export interface ICart {
    _id?: string;
    userId: mongoose.Schema.Types.ObjectId;
    // state:'inProgress'|'Enviado';
    creationDate: Date;
    lastModifiedDate?: Date;
    shipment?: number;
    products: [{ subProduct: ICartProduct; quantity: number, _id: ICartProduct }] | [];
}
