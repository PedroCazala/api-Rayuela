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
exports.OrdersController = void 0;
const orders_services_1 = require("../services/orders.services");
class OrdersController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrder } = req.params;
            console.log({ idOrder });
            try {
                if (idOrder) {
                    const order = yield orders_services_1.OrdersServices.getOne(idOrder);
                    res.status(200).json(order);
                }
                else {
                    const orders = yield orders_services_1.OrdersServices.getAll();
                    res.status(200).json(orders);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "No se pudo obtener el carrito",
                    error,
                });
            }
        });
    }
    static getByIdMP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrderMP } = req.params;
            console.log({ idOrderMP });
            // try {
            //     if (idOrder) {
            //         const order = await OrdersServices.getOne(idOrder);
            //         res.status(200).json(order);
            //     } else {
            //         const orders = await OrdersServices.getAll();
            //         res.status(200).json(orders);
            //     }
            // } catch (error) {
            //     res.status(500).json({
            //         message: "No se pudo obtener el carrito",
            //         error,
            //     });
            // }
        });
    }
    static getEditeState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrder, state } = req.params;
            try {
                const orders = yield orders_services_1.OrdersServices.getEditeState({ idOrder, state });
                res.status(200).json(orders);
            }
            catch (error) {
                res.status(500).json({
                    message: "No se pudo obtener el carrito",
                    error,
                });
            }
        });
    }
    static getByState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { state } = req.params;
            try {
                if (state) {
                    const orders = yield orders_services_1.OrdersServices.getByState(state);
                    res.status(200).json(orders);
                }
                else {
                    res.status(400).json({ message: 'Necesitas pasar el estado que buscas', opciones: ['Orden-creada', 'En-preparación', 'En-camino', 'recibida'] });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "No se pudieron obtener las ordenes",
                    error,
                });
            }
        });
    }
}
exports.OrdersController = OrdersController;
