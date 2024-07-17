import { ProductsDaoMongo } from "../daos/products.dao.mongo";
import { SubProductsDaoMongo } from "../daos/sub-products.dao.mongo";
import { IProduct, ISubProduct } from "../interfaces/products.interface";
// import { IProduct } from "../interfaces/products.interface";
// import { IProduct } from "../interfaces/products.interface";

const SortByMajorPrice = (products: IProduct[]) => {
    products.sort(function (a, b) {
        let priceA = a.price;
        let priceB = b.price;
        if (priceA > priceB) {
            return -1; // si el nombre de 'a' es menor que el de 'b'
        }
        if (priceA < priceB) {
            return 1; // si el nombre de 'a' es mayor que el de 'b'
        }
        return 0; // si son iguales
    });
    return products;
};
const SortByMinorPrice = (products: IProduct[]) => {
    products.sort(function (a, b) {
        let priceA = a.price;
        let priceB = b.price;
        if (priceA < priceB) {
            return -1; // si el nombre de 'a' es menor que el de 'b'
        }
        if (priceA > priceB) {
            return 1; // si el nombre de 'a' es mayor que el de 'b'
        }
        return 0; // si son iguales
    });
    return products;
};
const SortByName = (products: IProduct[]) => {
    products.sort(function (a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1; // si el nombre de 'a' es menor que el de 'b'
        }
        if (nameA > nameB) {
            return 1; // si el nombre de 'a' es mayor que el de 'b'
        }
        return 0; // si son iguales
    });
    return products;
};

export class ProductsService {
    static async getAllProductsSortByName() {
        const products = await ProductsDaoMongo.getAllProducts();
        const productsOrder = SortByName(products);
        return productsOrder;
    }
    static async getAllProductsSortByMinorPrice() {
        const products = await ProductsDaoMongo.getAllProducts();
        const productsOrder = SortByMinorPrice(products);
        return productsOrder;
    }
    static async getAllProductsSortByMajorPrice() {
        const products = await ProductsDaoMongo.getAllProducts();
        const productsOrder = SortByMajorPrice(products);
        return productsOrder;
    }
    static async getOneProduct(id: string) {
        try {
            const product = await ProductsDaoMongo.getOneById(id);
            return product;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // traer todos los subproductos de un determinado producto
    static async getSubProductsOfAProduct(id: string) {
        try {
            const product: IProduct | null = await ProductsDaoMongo.getOneById(
                id
            );
            const idSubProducts = product?.IDSubProducts;

            let subProducts: ISubProduct[] = [];
            if (idSubProducts) {
                for (const id of idSubProducts) {
                    const subProduct = await SubProductsDaoMongo.getOneById(id);
                    if (subProduct) {
                        subProducts = [...subProducts, subProduct];
                        // console.log(subProducts);
                    }
                }
            }

            return subProducts;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getForCategorySortByName(category: string) {
        try {
            const products = await ProductsDaoMongo.getForCategory(category);
            const productsOrder = SortByName(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static async getForCategorySortByMinorPrice(category: string) {
        try {
            const products = await ProductsDaoMongo.getForCategory(category);
            const productsOrder = SortByMinorPrice(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static async getForCategorySortByMajorPrice(category: string) {
        try {
            const products = await ProductsDaoMongo.getForCategory(category);
            const productsOrder = SortByMajorPrice(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static async getForBrandSortByName(brand: string) {
        try {
            const products = await ProductsDaoMongo.getForBrand(brand);
            const productsOrder = SortByName(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static async getForBrandSortByMajorPrice(brand: string) {
        try {
            const products = await ProductsDaoMongo.getForBrand(brand);
            const productsOrder = SortByMajorPrice(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static async getForBrandSortByMinorPrice(brand: string) {
        try {
            const products = await ProductsDaoMongo.getForBrand(brand);
            const productsOrder = SortByMinorPrice(products);
            return productsOrder;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    static createProduct(data: IProduct) {
        // const date:Date = new Date();
        const newProduct: IProduct = data;

        const product = ProductsDaoMongo.postAProduct(newProduct);
        return product;
    }
    static updateProduct({ idProduct, newData }: PropsUpdate) {
        const product = ProductsDaoMongo.updateProduct({ idProduct, newData });
        return product;
    }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})

    //     return product
    // }
    static deleteProduct(id: String) {
        const product = ProductsDaoMongo.deleteProduct(id);
        return product;
    }
}

interface PropsUpdate {
    idProduct: String;
    newData: IProduct;
}
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
