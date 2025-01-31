"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const products_dao_mongo_1 = require("../daos/products.dao.mongo");
const sub_products_dao_mongo_1 = require("../daos/sub-products.dao.mongo");
// import { IProduct } from "../interfaces/products.interface";
// import { IProduct } from "../interfaces/products.interface";
const SortByMajorPrice = (products) => {
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
const SortByMinorPrice = (products) => {
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
const SortByName = (products) => {
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
class ProductsService {
    static getAllProductsSortByName() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_dao_mongo_1.ProductsDaoMongo.getAllProducts();
            const productsOrder = SortByName(products);
            return productsOrder;
        });
    }
    static getAllProductsSortByMinorPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_dao_mongo_1.ProductsDaoMongo.getAllProducts();
            const productsOrder = SortByMinorPrice(products);
            return productsOrder;
        });
    }
    static getAllProductsSortByMajorPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_dao_mongo_1.ProductsDaoMongo.getAllProducts();
            const productsOrder = SortByMajorPrice(products);
            return productsOrder;
        });
    }
    static getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_dao_mongo_1.ProductsDaoMongo.getOneById(id);
                return product;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    // traer todos los subproductos de un determinado producto
    static getSubProductsOfAProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_dao_mongo_1.ProductsDaoMongo.getOneById(id);
                const idSubProducts = product === null || product === void 0 ? void 0 : product.IDSubProducts;
                let subProducts = [];
                if (idSubProducts) {
                    for (const id of idSubProducts) {
                        const subProduct = yield sub_products_dao_mongo_1.SubProductsDaoMongo.getOneById(id);
                        if (subProduct) {
                            subProducts = [...subProducts, subProduct];
                            // console.log(subProducts);
                        }
                    }
                }
                return subProducts;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForCategorySortByName(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForCategory(category);
                const productsOrder = SortByName(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForCategorySortByMinorPrice(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForCategory(category);
                const productsOrder = SortByMinorPrice(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForCategorySortByMajorPrice(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForCategory(category);
                const productsOrder = SortByMajorPrice(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForBrandSortByName(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForBrand(brand);
                const productsOrder = SortByName(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForBrandSortByMajorPrice(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForBrand(brand);
                const productsOrder = SortByMajorPrice(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getForBrandSortByMinorPrice(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_dao_mongo_1.ProductsDaoMongo.getForBrand(brand);
                const productsOrder = SortByMinorPrice(products);
                return productsOrder;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static createProduct(data) {
        // const date:Date = new Date();
        const newProduct = data;
        const product = products_dao_mongo_1.ProductsDaoMongo.postAProduct(newProduct);
        return product;
    }
    static updateProduct({ idProduct, newData }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ newData });
            const product = yield products_dao_mongo_1.ProductsDaoMongo.updateProduct({ idProduct, newData });
            console.log({ product });
            return product;
        });
    }
    static addIDSubProductToProduct({ idProduct, arrayIdsSub }) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateProduct = yield products_dao_mongo_1.ProductsDaoMongo.addIDSubProductToProduct({ idProduct, arrayIdsSub });
            console.log({ updateProduct });
            return updateProduct;
        });
    }
    // static async updateTypeProduct({idProduct,idType,newData}:PropsUpdateType){
    //     const product = await ProductsDaoMongo.updateTypeProduct({idProduct,idType,newData})
    //     return product
    // }
    static deleteProduct(id) {
        const product = products_dao_mongo_1.ProductsDaoMongo.deleteProduct(id);
        return product;
    }
}
exports.ProductsService = ProductsService;
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
