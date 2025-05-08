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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const account_transport_1 = require("./account_transport");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const mail_rover = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oauth2Client = new OAuth2(account_transport_1.account_transport.auth.clientId, account_transport_1.account_transport.auth.clientSecret, "https://developers.google.com/oauthplayground");
        oauth2Client.setCredentials({
            refresh_token: account_transport_1.account_transport.auth.refreshToken,
        });
        const accessToken = yield oauth2Client.getAccessToken();
        if (!accessToken.token) {
            throw new Error("No se pudo obtener el token de acceso");
        }
        account_transport_1.account_transport.auth.accessToken = accessToken.token;
        const transporter = nodemailer_1.default.createTransport({
            service: account_transport_1.account_transport.service,
            auth: {
                type: "OAuth2",
                user: account_transport_1.account_transport.auth.user,
                clientId: account_transport_1.account_transport.auth.clientId,
                clientSecret: account_transport_1.account_transport.auth.clientSecret,
                refreshToken: account_transport_1.account_transport.auth.refreshToken,
                accessToken: accessToken.token,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        callback(transporter);
    }
    catch (error) {
        console.error("Error obteniendo el token de acceso:", error);
    }
});
// Variables generales
const _SERVER = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : "";
const _ID_APP_1 = 1;
const head = "Bienvenido a Rayu";
const footer = "Gracias por usar nuestra app";
function send(idAplicativo, 
// to: string,
callback) {
    let id = 0;
    try {
        id = parseInt(idAplicativo);
    }
    catch (error) {
        console.error(`Error parseando idAplicativo: ${error}`);
    }
    mail_rover((emailTransporter) => {
        const json = {
            url: `${_SERVER}rayu/`,
            mail: emailTransporter,
            app: "Rayu",
            from: `Rayu <${process.env.MAIL_RAYU_VENTAS}>`,
            to: "",
            slogan: "Tu librería online",
            body_bienvenida: "Mensaje personalizado",
            head_bienvenida: "Hola, bienvenido a Rayu.",
            bcc: "",
            head: head,
            footer: footer,
        };
        callback(json);
    });
}
exports.send = send;
