"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yamljs_1 = __importDefault(require("yamljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let routesDir = path_1.default.join(__dirname, 'routes');
if (!fs_1.default.existsSync(routesDir)) {
    // Si no existe en build, busca en src/routes (desarrollo)
    routesDir = path_1.default.join(__dirname, '../src/routes');
}
const files = fs_1.default.readdirSync(routesDir).filter(f => f.endsWith('.swagger.yaml'));
const openapiBase = {
    openapi: '3.0.0',
    info: {
        title: 'API Rayu',
        version: '1.0.0',
        description: 'Documentación de la API Rayu',
    },
    paths: {},
    tags: []
};
files.forEach(file => {
    const doc = yamljs_1.default.load(path_1.default.join(routesDir, file));
    if (doc.tags)
        openapiBase.tags.push(...doc.tags);
    if (doc.paths)
        Object.assign(openapiBase.paths, doc.paths);
});
exports.default = openapiBase;
