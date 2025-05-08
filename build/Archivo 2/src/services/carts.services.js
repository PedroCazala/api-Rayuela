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
exports.CartsServices = void 0;
const carts_dao_mongo_1 = require("../daos/carts.dao.mongo");
class CartsServices {
    static getCart(id) {
        const cart = carts_dao_mongo_1.CartsDaoMongo.getOneById(id);
        return cart;
    }
    static create(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const newCart = {
                creationDate: date,
                userId,
                products: [],
            };
            const carrito = yield carts_dao_mongo_1.CartsDaoMongo.createCart(newCart);
            return carrito;
        });
    }
    static delete(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_mongo_1.CartsDaoMongo.deleteCart(idCart);
            return cart;
        });
    }
    static getProductsOfCart(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCart(idCart);
            const productsOfCart = cart === null || cart === void 0 ? void 0 : cart.products;
            return productsOfCart;
        });
    }
    static getOneProductOfCartById({ idCart, idSubProduct, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.getCart(idCart);
                const subProduct = cart === null || cart === void 0 ? void 0 : cart.products.find((subProd) => subProd._id == idSubProduct);
                return subProduct;
            }
            catch (error) {
                console.log(error);
                throw new Error("Ocurrió un error en el servicio get one Product of cart by id");
            }
        });
    }
    static addProductToCart({ idCart, idSubProduct, quantity, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.getOneProductOfCartById({
                    idCart,
                    idSubProduct,
                    quantity,
                });
                if (exist) {
                    yield this.modifiedQuantityProductToCart({
                        idCart,
                        idSubProduct,
                        quantity,
                    });
                    const cart = yield CartsServices.getCart(idCart);
                    return cart;
                }
                else {
                    if (idSubProduct) {
                        // const subProd = await SubProductsService.getOneSubProduct(idSubProduct)
                        const subProduct = {
                            subProduct: { _id: idSubProduct },
                            _id: idSubProduct,
                            quantity,
                        };
                        console.warn(subProduct);
                        yield carts_dao_mongo_1.CartsDaoMongo.addSubprodctToCart({
                            idCart,
                            subProduct,
                        });
                        const cart = yield CartsServices.getCart(idCart);
                        return cart;
                    }
                }
                return undefined;
            }
            catch (error) {
                console.log(error);
                throw new Error("Ocurrió un error en el servicio al intentar agregar el producto");
            }
        });
    }
    static modifiedQuantityProductToCart({ idCart, idSubProduct, quantity, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCart(idCart);
            const subProducts = cart === null || cart === void 0 ? void 0 : cart.products.map((sub) => {
                if (sub._id == idSubProduct) {
                    sub.quantity = quantity;
                }
                return sub;
            });
            if (subProducts) {
                const modified = carts_dao_mongo_1.CartsDaoMongo.modifiedProductToCart({
                    idCart,
                    subProducts,
                });
                return modified;
            }
            return undefined;
        });
    }
    static clearCart(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const subProducts = [];
            const deleted = yield carts_dao_mongo_1.CartsDaoMongo.modifiedProductToCart({
                idCart,
                subProducts,
            });
            return deleted;
        });
    }
    static deleteProductOfCart({ idCart, idSubProduct, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_mongo_1.CartsDaoMongo.getOneById(idCart);
            const subProducts = cart === null || cart === void 0 ? void 0 : cart.products;
            if (subProducts) {
                const index = subProducts.findIndex((subProd) => subProd._id == idSubProduct);
                if (index !== -1) {
                    subProducts.splice(index, 1);
                    const edited = yield carts_dao_mongo_1.CartsDaoMongo.modifiedProductToCart({
                        idCart,
                        subProducts,
                    });
                    return edited;
                }
            }
            return undefined;
        });
    }
    static returnTotalPrice(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getCart(idCart);
            const arrayTotals = cart === null || cart === void 0 ? void 0 : cart.products.map((prod) => {
                var _a, _b;
                const quantity = prod.quantity;
                const price = (_b = (_a = prod.subProduct) === null || _a === void 0 ? void 0 : _a.IDProduct) === null || _b === void 0 ? void 0 : _b.price;
                if (quantity !== undefined && price !== undefined) {
                    return quantity * price;
                }
                return 0;
            });
            const suma = arrayTotals
                ? arrayTotals.reduce((a, b) => a + (b !== null && b !== void 0 ? b : 0), 0)
                : 0;
            return suma;
        });
    }
}
exports.CartsServices = CartsServices;
