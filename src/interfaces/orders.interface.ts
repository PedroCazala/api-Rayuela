import mongoose from "mongoose";
import { IUser } from "./users.interface";
import { ICart } from "./carts.interface";

export interface IOrder {
    _id?: string;
    cartId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    cartProducts:  ICart['products'];
    userDirection:  IUser['direction'];
    state:'Orden-creada'|'En-preparación'|'En-camino'|'recibida';
    priceShipment:number;
    totalPriceOfProducts:number;
    totalPrice:number;
    creationDate:Date;
    preferenceIdMercadoPago:string;
}