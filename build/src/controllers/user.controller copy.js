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
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
class UserController {
    static getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const user = yield user_services_1.UserService.getOneUserById(idUser);
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static UpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const newInfo = req.body;
            // console.log('info update user',idUser,newInfo);
            try {
                const user = yield user_services_1.UserService.UpdateUser(idUser, newInfo);
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.UserController = UserController;
