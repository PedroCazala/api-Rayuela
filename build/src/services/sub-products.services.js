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
exports.SubProductsService = void 0;
const sub_products_dao_mongo_1 = require("../daos/sub-products.dao.mongo");
const files_services_1 = require("./files.services");
class SubProductsService {
    static getOneSubProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subProduct = yield sub_products_dao_mongo_1.SubProductsDaoMongo.getOneById(id);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getOneSubProductToCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subProduct = yield sub_products_dao_mongo_1.SubProductsDaoMongo.getOneByIdToCart(id);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static createSubProducts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSubProducts = yield sub_products_dao_mongo_1.SubProductsDaoMongo.CreateSubProducts(data);
            for (let i = 0; i < newSubProducts.length; i++) {
                const subProd = newSubProducts[i];
                // Obtener las fotos correspondientes al subproducto actual
                const matchingPhotos = data[i];
                if (matchingPhotos && matchingPhotos.imgFiles) {
                    // Agregar las fotos usando el servicio adecuado
                    console.log(matchingPhotos.imgFiles);
                    yield files_services_1.FilesService.addPicturesSubProducts({ idSubProduct: subProd._id, files: matchingPhotos.imgFiles });
                }
            }
            return newSubProducts;
        });
    }
    static updateSubProduct({ idSubProduct, newData }) {
        const subProds = sub_products_dao_mongo_1.SubProductsDaoMongo.updateSubProduct({ idSubProduct, newData });
        return subProds;
    }
    static discountStockSubProduct({ idSubProduct, subtract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProd = yield this.getOneSubProduct(idSubProduct);
            console.log({ MESSAGE: 'entro a discountStockSubProduct', subProd });
            console.log({ message: 'siguiente', idSubProduct, subtract });
            if (subProd) {
                const newStock = subProd.stock - subtract;
                console.log({ message: 'entro al map pARA descontar', idSubProduct, subtract, newStock });
                const update = sub_products_dao_mongo_1.SubProductsDaoMongo.updateSubProduct({ idSubProduct, newData: { subProd, stock: newStock } });
                return update;
            }
            else {
                return new Error;
            }
        });
    }
    static deleteSubProduct(id) {
        const subProduct = sub_products_dao_mongo_1.SubProductsDaoMongo.deleteSubProduct(id);
        return subProduct;
    }
    static addImgSubProduct(idSubProduct, newImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const SubProduct = yield sub_products_dao_mongo_1.SubProductsDaoMongo.addImgSubProduct(idSubProduct, newImg);
            return SubProduct;
        });
    }
}
exports.SubProductsService = SubProductsService;
