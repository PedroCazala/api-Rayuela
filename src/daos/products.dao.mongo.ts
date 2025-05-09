import { IProduct } from "../interfaces/products.interface";
import { ProductModel, SubProductsModel } from "../models/product.model";

export class ProductsDaoMongo {
    // Traer todos los productos
    static async getAllProducts() /* :Promise<IProduct[]> */ {
        const allProducts = await ProductModel.find().populate("IDSubProducts");
        return allProducts;
    }
    // Traer todos los subproductos
    static async getAllSubProducts() {
        const allProducts = await SubProductsModel.find();
        return allProducts;
    }
    //traer productos por CATEGORÍA
    static async getForCategory(category: String) {
        const products = await ProductModel.find({
            category: category,
        }).populate("IDSubProducts");
        return products;
    }
    //traer productos por MARCA
    static async getForBrand(brand: String) {
        const products = await ProductModel.find({ brand: brand }).populate(
            "IDSubProducts"
        );
        return products;
    }

    static async getOneById(id: String) {
        const product = await ProductModel.findOne({ _id: id }).populate(
            "IDSubProducts"
        );
        return product;
    }

    //Crear un producto
    static async postAProduct(newProduct: IProduct) {
        const product = await ProductModel.create(newProduct);
        console.log(product);

        return product;
    }

    static async updateProduct({ idProduct, newData }: IPropsUpdateProduct) {
        const product = await ProductModel.findByIdAndUpdate(
            idProduct,
            newData,
            { new: true }
        );
        return product;
    }


    static async addIDSubProductToProduct({
        idProduct,
        arrayIdsSub,
    }: {
        idProduct: string;
        arrayIdsSub: string[];
    }) {
        const product = await ProductModel.updateOne(
            { _id: idProduct },
            { $push: { IDSubProducts: { $each: arrayIdsSub } } }
        );
        return product;
    }

    static async deleteProduct(id: String) {
        const product = await ProductModel.deleteOne({ _id: id });
        return product;
    }
}
interface IPropsUpdateProduct {
    idProduct: String;
    newData: IProduct;
}
// interface PropsUpdateTypeProduct{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
