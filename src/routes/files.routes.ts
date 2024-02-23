import express from "express";
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
    upload.single("file-user"),
    (req, res) => {
        FilesController.addPictureUser(req, res);
        // res.send('hola pe');
    }
);
FilesRoutes.post(
    "/imgs-subProduct/:idSubProduct",
    passport.authenticate("jwt-admin", { session: false }),
    upload.array("files-img-subProduct"),
    
    (req, res) => {
        FilesController.addPicturesSubProducts(req, res);
        console.log('entro');
        // res.send('hola pe');
    }
);

export { FilesRoutes };
