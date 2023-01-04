import mongoose from 'mongoose'
import { IProduct } from '../interfaces/products.interface';

const productsCollection = 'Products';

const productsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number, required:true},
    category:{type:String,require:true},
    brand: {type:String},
    creationDate:{type:Number, required:true},
    lastModifiedDate:{type:Number},
    types: [{
        img: [{ type: String,required:true }],
        barcode: { type: String },
        color: { type: String, required: true },
        quantity: { type: Number, required: true },
        stock: { type: Number, required: true },
        size: { type: Number },
        weight: { type: Number }
    }]
})

export const ProductModel = mongoose.model<IProduct>(productsCollection,productsSchema) 
