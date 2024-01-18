import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    cartId:  mongoose.Schema.Types.ObjectId;
    rol: 'user'|'admin',
    email:string;
    password:string;
    creationDate: Date;
    lastModifiedDate?: Date;

    name?: string;
    lastName?: string;
    direction?: {
        address?: string;
        city?: string;
        prov?: string;
        CP?: number;
    };
    phone?: number;
    img?: string;
    dateBird?:Date;
    IsValidPassword(password: string): Promise<boolean>;

}