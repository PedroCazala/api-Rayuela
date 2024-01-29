import express, { Router } from "express";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";
import { passport } from "../auth/auth";

const upload = multer({ storage: multer.memoryStorage() });
const FilesRoutes = express.Router();

// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// export const storage =getStorage()

FilesRoutes.post(
    "/img-user/:idUser",
    passport.authenticate("jwt", { session: false }),
    upload.single("filename"),
    (req, res) => {
        FilesController.addPictureUser(req, res);
        // console.log('hola pe');
        // res.send('hola pe');
    }
);

export { FilesRoutes };
