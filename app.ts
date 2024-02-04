import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//---- Conexión a mongoAtlas ----
import { connectMongoDb } from "./src/db/connectMongoDb";
connectMongoDb();

const PORT = process.env.PORT || 9000;
//---- Server corriendo ----
const server = app.listen(PORT, () =>
    console.log(`🔥The server is running in http://localhost:${PORT}`)
);
server.on("error", (error: Error) =>
    console.log(`Error en el servidor ${error}`)
);

//---- Cors para porder realizar peticiones desde otros puertos ----
import cors from "cors";
app.use(cors());

//---- Rutas ----
import { IndexRouter } from "./src/routes";
app.use("/", IndexRouter);

import serverless from "serverless-http";
module.exports = app;
module.exports.handler = serverless(app);