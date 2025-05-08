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
exports.UserDaoMongo = void 0;
const user_model_1 = require("../models/user.model");
const carts_services_1 = require("../services/carts.services");
class UserDaoMongo {
    static getOneById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_model_1.UserModel.findById(idUser);
            return user;
        });
    }
    static getOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_model_1.UserModel.find({ email });
            return user;
        });
    }
    static createUserFromGoogleProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emails, name } = profile;
                const creationDate = new Date();
                if (emails) {
                    const user = yield user_model_1.UserModel.create({
                        email: emails[0],
                        creationDate,
                        name: name === null || name === void 0 ? void 0 : name.givenName,
                        lastName: name === null || name === void 0 ? void 0 : name.familyName,
                        rol: "user",
                    });
                    const createCart = yield carts_services_1.CartsServices.create(user._id);
                    const completeUser = yield user_model_1.UserModel.findByIdAndUpdate(user._id, { $set: { cartId: createCart._id } }, { new: true });
                    if (completeUser)
                        return completeUser;
                }
            }
            catch (err) {
                return err;
            }
        });
    }
    static UpdateUser(idUser, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findByIdAndUpdate(idUser, { $set: data }, { new: true } // Esto devuelve el documento actualizado
            );
            return user;
        });
    }
    static UpdateImgUser(idUser, newImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findByIdAndUpdate(idUser, { $set: { img: newImg } }, { new: true } // Esto devuelve el documento actualizado
            );
            return user;
        });
    }
}
exports.UserDaoMongo = UserDaoMongo;
