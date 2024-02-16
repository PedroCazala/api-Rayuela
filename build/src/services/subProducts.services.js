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
const subProducts_dao_mongo_1 = require("../daos/subProducts.dao.mongo");
const files_services_1 = require("./files.services");
class SubProductsService {
    // static getAllProducts(){
    //     const products = ProductsDaoMongo.getAllProducts()
    //     return products
    // }
    static getOneSubProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.getOneById(id);
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
                const subProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.getOneByIdToCart(id);
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
            const newSubProducts = yield subProducts_dao_mongo_1.SubProductsDaoMongo.CreateSubProducts(data);
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
        const subProds = subProducts_dao_mongo_1.SubProductsDaoMongo.updateSubProduct({ idSubProduct, newData });
        return subProds;
    }
    static deleteSubProduct(id) {
        const subProduct = subProducts_dao_mongo_1.SubProductsDaoMongo.deleteSubProduct(id);
        return subProduct;
    }
    static addImgSubProduct(idSubProduct, newImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const SubProduct = yield subProducts_dao_mongo_1.SubProductsDaoMongo.addImgSubProduct(idSubProduct, newImg);
            // const carritosConProducto = await CartModel.find({ 'products.SubProduct': idSubProduct });
            // // Elimina el producto de la lista de productos en cada carrito
            // await Promise.all(
            //     carritosConProducto.map(async (carrito) => {
            //         carrito.products = carrito.products.filter((subProd) => subProd.subProduct !== idSubProduct);
            //         await carrito.save();
            //     })
            // );
            return SubProduct;
        });
    }
}
exports.SubProductsService = SubProductsService;
// interface PropsUpdateType{
//     idProduct:String,
//     idType:String,
//     newData:Object
// }
