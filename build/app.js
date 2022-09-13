"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 9000;
//Server corriendo
const server = app.listen(PORT, () => console.log(`🔥The server is running in http://localhost:${PORT}`));
server.on('error', (error) => console.log(`Error en el servidor ${error}`));
app.get('/', (_, res) => {
    res.status(200).json({ message: 'Api de Rayuela', documentation_swagger: 'Aquí ira la url' });
});
