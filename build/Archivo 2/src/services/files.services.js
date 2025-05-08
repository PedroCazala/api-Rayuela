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
exports.FilesService = void 0;
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("../config/firebase.config");
const app_1 = require("firebase/app");
const sub_products_services_1 = require("./sub-products.services");
const user_services_1 = require("./user.services");
(0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
const storage = (0, storage_1.getStorage)();
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
};
class FilesService {
    static addPictureUser({ idUser, file }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateTime = giveCurrentDateTime();
            const storageRef = (0, storage_1.ref)(storage, `users/${file.originalname + " " + dateTime}`);
            // Create file metadata including the content type
            const metadata = {
                contentType: file.mimetype,
            };
            // Upload the file in the bucket storage
            const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
            // Grab the public url
            const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
            console.log("File successfully uploaded.");
            console.log("File successfully uploaded.");
            yield user_services_1.UserService.UpdateImgUser(idUser, downloadURL);
            return downloadURL;
        });
    }
    static addPicturesSubProducts({ idSubProduct, files }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateTime = giveCurrentDateTime();
            console.log("existen los archivos");
            for (const file of files) {
                const storageRef = (0, storage_1.ref)(storage, `sub-products/${file.originalname + " " + dateTime}`);
                // Create file metadata including the content type
                const metadata = {
                    contentType: file.mimetype,
                };
                // Upload the file in the bucket storage
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
                //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
                // Grab the public url
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                console.log("File successfully uploaded.");
                console.log("File successfully uploaded.");
                yield sub_products_services_1.SubProductsService.addImgSubProduct(idSubProduct, downloadURL);
            }
        });
    }
}
exports.FilesService = FilesService;
