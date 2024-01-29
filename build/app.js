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
//---- Conexión a mongoAtlas ----
const connectMongoDb_1 = require("./src/db/connectMongoDb");
(0, connectMongoDb_1.connectMongoDb)();
const PORT = process.env.PORT || 9000;
//---- Server corriendo ----
const server = app.listen(PORT, () => console.log(`🔥The server is running in http://localhost:${PORT}`));
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
//---- Cors para porder realizar peticiones desde otros puertos ----
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
//---- Rutas ----
const routes_1 = require("./src/routes");
app.use("/", routes_1.IndexRouter);
