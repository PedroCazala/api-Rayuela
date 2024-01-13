import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    cartId:  mongoose.Schema.Types.ObjectId;
    rol: 'user'|'admin',
    email:string;
    password:string;
    // state:'inProgress'|'Enviado';
    creationDate: Date;
    lastModifiedDate?: Date;
    cart:string;
    IsValidPassword(password: string): Promise<boolean>;

}