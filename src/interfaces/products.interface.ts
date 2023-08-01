export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    creationDate: Date;
    lastModifiedDate?: Date;
    size?: number;
    weight?: number;
    discount?:number;
    IDSubProducts?: ISubProduct['_id'][];
    // subProducts?:ISubProduct[]
}
export interface ISubProduct {
    _id?: string; 
    img: string[];
    barcode?: string;
    color: string;
    stock: number;
    quantity?: number;
    creationDate:Date,
    lastModifiedDate?:Date
}
