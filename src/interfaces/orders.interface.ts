import mongoose from "mongoose";
import { IUser } from "./users.interface";
// import { ICart } from "./carts.interface";
import { ISubProduct } from "./products.interface";

export interface IOrder {
    _id?: string;
    cartId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    cartProducts:{
        subProduct: mongoose.Schema.Types.ObjectId; 
        // _id:ICartProduct,
        price: number,
        quantity: number
    }[]
    // ISubProduct[]
    // {
    //     subProduct: ISubProduct,
    //     _id:ICartProduct,
    //     quantity: number
    // } []
    //  ICart['products'][];
    userDirection:  IUser['direction'];
    state:'Orden-creada'|'En-preparación'|'En-camino'|'recibida';
    typeOfShipment:'giles'|'argentina'|'retira';
    priceShipment:number;
    totalPriceOfProducts:number;
    totalPrice:number;
    creationDate:Date;
    // externalReference:string;
}