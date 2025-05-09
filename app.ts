import express from "express";
import "dotenv/config";
// require('dotenv').config({ path: '../.env' });

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Swagger UI ----
import { setupSwaggerDocs } from './src/swagger-ui';
setupSwaggerDocs(app);

//---- Conexión a mongoAtlas ----
import { connectMongoDb } from "./src/db/connectMongoDb";
connectMongoDb();

const PORT = process.env.PORT || 9000;
//---- Server corriendo ----
const server = app.listen(PORT, () =>
    console.log(`🔥The server is running in http://127.0.0.1:${PORT}`)
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

// Inicia los cron jobs automáticamente
import "./src/services/cronJobs"; 

// import serverless from "serverless-http";
// module.exports = app;
// module.exports.handler = serverless(app);


