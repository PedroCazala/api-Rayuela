export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    creationDate: Date;
    lastModifiedDate: Date;
    types: ITypeItem[];
}
export interface ITypeItem {
    // _id: string; //eliminar luego!!
    img: string[];
    barcode?: string;
    color: string;
    quantity: number;
    stock: number;
    size?: number;
    weight?: number;
}
