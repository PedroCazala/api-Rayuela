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
exports.OrdersDaoMongo = void 0;
const order_model_1 = require("../models/order.model");
class OrdersDaoMongo {
    static getOneById(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findById(idOrder);
            return order;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.OrderModel.find().populate("userId");
            return orders;
        });
    }
    static getByState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.OrderModel.find({ state }).populate("userId");
            return orders;
        });
    }
    static getByPreferenceIdMercadoPago(preferenceIdMercadoPago) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.OrderModel.find({ preferenceIdMercadoPago });
            return orders;
        });
    }
    static create(newOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.create(newOrder);
            return order;
        });
    }
    static getEditeState({ idOrder, state }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findOneAndUpdate({
                _id: idOrder
            }, { state });
            return order;
        });
    }
}
exports.OrdersDaoMongo = OrdersDaoMongo;
