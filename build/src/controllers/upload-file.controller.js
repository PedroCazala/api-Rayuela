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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const express_1 = require("express");
const firebase_admin_1 = require("firebase-admin");
const storage_1 = require("firebase/storage");
const multer_1 = __importDefault(require("multer"));
const firebase_confing_1 = require("../config/firebase.confing");
const router = (0, express_1.Router)();
(0, firebase_admin_1.initializeApp)(firebase_confing_1.firebaseConfig);
const storage = (0, storage_1.getStorage)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};
class FilesController {
    static addPictureUser(Req, Res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.FilesController = FilesController;
router.post('/imgUser', upload.single("filename"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateTime = giveCurrentDateTime();
        if (req.file) {
            const storageRef = (0, storage_1.ref)(storage, `files/${req.file.originalname + "       " + dateTime}`);
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
            return res.send({
                message: 'file uploaded to firebase storage',
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadURL
            });
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
}));
