"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.account_transport = void 0;
require("dotenv");
// Declarar `account_transport` con la estructura correcta
exports.account_transport = {
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "ventas.rayu@gmail.com",
        clientId: (_a = process.env.MAIL_GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : undefined,
        clientSecret: (_b = process.env.MAIL_GOOGLE_CLIENT_SECRET) !== null && _b !== void 0 ? _b : undefined,
        refreshToken: (_c = process.env.MAIL_GOOGLE_REFRESH_TOKEN) !== null && _c !== void 0 ? _c : undefined,
        accessToken: (_d = process.env.MAIL_GOOGLE_ACCESS_TOKEN) !== null && _d !== void 0 ? _d : undefined // Si lo usas
    }
};
