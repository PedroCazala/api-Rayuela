import mongoose from 'mongoose'
import { ICart } from '../interfaces/carts.interface';
// import {userCollection} from './user.model';
// import { ICompleteProduct } from "../interfaces/products.interface";
const cartCollection = 'Carts';

const CartsSchema = new mongoose.Schema <ICart>({
    // userId:  [{ type: mongoose.Types.ObjectId, ref: userCollection, required:true }],
    userId: {type:String,required:true},  
    creationDate:{type:Date, required:true},
    products:{type:[]},
    lastModifiedDate:{type:Date},
})

export const CartModel = mongoose.model<ICart>(cartCollection,CartsSchema) 
