"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const files_controller_1 = require("../controllers/files.controller");
const auth_1 = require("../auth/auth");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const FilesRoutes = express_1.default.Router();
exports.FilesRoutes = FilesRoutes;
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// export const storage =getStorage()
FilesRoutes.post("/img-user/:idUser", auth_1.passport.authenticate("jwt", { session: false }), upload.single("filename"), (req, res) => {
    files_controller_1.FilesController.addPictureUser(req, res);
    // console.log('hola pe');
    // res.send('hola pe');
});
