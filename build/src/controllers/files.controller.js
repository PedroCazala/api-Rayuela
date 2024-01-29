"use strict";
// import { initializeApp } from "firebase-admin";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { firebaseConfig } from "../config/firebase.config";
// import multer from "multer";
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
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("../config/firebase.config");
const app_1 = require("firebase/app");
const user_services_1 = require("../services/user.services");
(0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
const storage = (0, storage_1.getStorage)();
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};
class FilesController {
    static addPictureUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUser } = req.params;
                const dateTime = giveCurrentDateTime();
                if (req.file) {
                    const storageRef = (0, storage_1.ref)(storage, `users/${req.file.originalname + " " + dateTime}`);
                    // Create file metadata including the content type
                    const metadata = {
                        contentType: req.file.mimetype,
                    };
                    // Upload the file in the bucket storage
                    const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
                    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
                    // Grab the public url
                    const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                    console.log('File successfully uploaded.');
                    console.log('File successfully uploaded.');
                    yield user_services_1.UserService.UpdateImgUser(idUser, downloadURL);
                    return res.send({
                        message: 'file uploaded to firebase storage',
                        name: req.file.originalname,
                        type: req.file.mimetype,
                        downloadURL: downloadURL
                    });
                }
                else {
                    return res.status(400).send('No file attached.');
                }
            }
            catch (error) {
                console.log('entro al catch', error.message);
                return res.status(400).send(error.message);
            }
        });
    }
}
exports.FilesController = FilesController;
