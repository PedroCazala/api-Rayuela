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
exports.UserService = void 0;
const user_dao_mongo_1 = require("../daos/user.dao.mongo");
class UserService {
    static getOneUserById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_mongo_1.UserDaoMongo.getOneById(idUser);
            return user;
        });
    }
    static createUserFromGoogleProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_mongo_1.UserDaoMongo.createUserFromGoogleProfile(profile);
            return user;
        });
    }
    static UpdateUser(idUser, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_mongo_1.UserDaoMongo.UpdateUser(idUser, data);
            return user;
        });
    }
    static UpdateImgUser(idUser, newImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_mongo_1.UserDaoMongo.UpdateImgUser(idUser, newImg);
            return user;
        });
    }
}
exports.UserService = UserService;
