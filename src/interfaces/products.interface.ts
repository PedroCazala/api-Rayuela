export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    creationDate: Date;
    lastModifiedDate?: Date;
    size?: string;
    weight?: number;
    discount?:number;
    minimumStock?:number,
    IDSubProducts: ISubProduct['_id'][];
}
export interface ISubProduct {
    _id: string; 
    img: string[];
    barcode?: string;
    color: string;
    stock: number;
    creationDate:Date,
    lastModifiedDate?:Date
    IDProduct: IProduct['_id'];

}
export interface ICompleteProduct extends IProduct {
    subProducts :[ISubProduct]

}

export interface ICompleteSubProductToCart extends ISubProduct {
    quantity:number
}