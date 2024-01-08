import { ICompleteProduct } from "./products.interface";

export interface IUser {
    _id: string;
    userId: string;
    // state:'inProgress'|'Enviado';
    creationDate: Date;
    lastModifiedDate?: Date;
    products:[ICompleteProduct] | [];
}