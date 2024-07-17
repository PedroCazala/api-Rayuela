import mongoose from "mongoose";

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    creationDate: Date;
    lastModifiedDate?: Date;
    // size?: string;
    size?: {
        length: number;
        width: number;
        height: number;
    };
    weight?: number;
    discount?: number;
    minimumStock?: number;
    IDSubProducts: ISubProduct["_id"][];
}
export interface ISubProduct {
    _id: string;
    img?: string[];
    imgFiles?: Express.Multer.File[];
    barcode?: string;
    color: string;
    stock: number;
    creationDate: Date;
    lastModifiedDate?: Date;
    IDProduct: mongoose.Schema.Types.ObjectId;
}
export interface ICompleteProduct extends IProduct {
    subProducts: [ISubProduct];
}

export interface ICartProduct {
    subProduct: mongoose.Types.ObjectId;
    quantities: {
        subProduct: mongoose.Types.ObjectId;
        quantity: number;
    };
}
