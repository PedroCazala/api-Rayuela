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
exports.FilesController = void 0;
const files_services_1 = require("../services/files.services");
class FilesController {
    static addPictureUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUser } = req.params;
                if (req.file) {
                    const downloadURL = yield files_services_1.FilesService.addPictureUser({ idUser, file: req.file });
                    return res.send({
                        message: "file uploaded to firebase storage",
                        name: req.file.originalname,
                        type: req.file.mimetype,
                        downloadURL: downloadURL,
                    });
                }
                else {
                    return res.status(400).send("No file attached.");
                }
            }
            catch (error) {
                console.log("entro al catch", error.message);
                return res.status(400).send(error.message);
            }
        });
    }
    static addPicturesSubProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSubProduct } = req.params;
                if (req.files) {
                    req.files &&
                        files_services_1.FilesService.addPicturesSubProducts({
                            idSubProduct,
                            files: req.files,
                        });
                    return res.send({
                        message: `files uploaded to firebase storage and add to subProd: ${idSubProduct}`,
                    });
                }
                else {
                    return res.status(400).send("No file attached.");
                }
            }
            catch (error) {
                console.log("entro al catch", error.message);
                return res.status(400).send(error.message);
            }
        });
    }
}
exports.FilesController = FilesController;
