"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRoutes = void 0;
const express_1 = require("express");
const payments_controller_1 = require("../controllers/payments.controller");
const PaymentsRoutes = (0, express_1.Router)();
exports.PaymentsRoutes = PaymentsRoutes;
PaymentsRoutes.post('/create-order', payments_controller_1.PaymentsController.createOrder);
PaymentsRoutes.get('/success', (_, res) => {
    res.send('success');
});
PaymentsRoutes.get('/failure', (_, res) => {
    res.send('failure');
});
PaymentsRoutes.get('/pending', (_, res) => {
    res.send('pending');
});
PaymentsRoutes.post('/webhook', payments_controller_1.PaymentsController.receiveWebhook);
