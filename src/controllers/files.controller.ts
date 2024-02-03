import { Router, Request, Response } from "express";
import { FilesService } from "../services/files.services";

export class FilesController {
    static async addPictureUser(req: Request, res: Response) {
        try {
            const { idUser } = req.params;
            if (req.file) {
                const downloadURL = await FilesService.addPictureUser({idUser,file:req.file})
                return res.send({
                    message: "file uploaded to firebase storage",
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    downloadURL: downloadURL,
                });
            } else {
                return res.status(400).send("No file attached.");
            }
        } catch (error: any) {
            console.log("entro al catch", error.message);

            return res.status(400).send(error.message);
        }
    }
    static async addPicturesSubProducts(req: Request, res: Response) {
        try {
            const { idSubProduct } = req.params;
            if (req.files) {
                req.files &&
                    FilesService.addPicturesSubProducts({
                        idSubProduct,
                        files: req.files as Express.Multer.File[],
                    });
                return res.send({
                    message: `files uploaded to firebase storage and add to subProd: ${idSubProduct}`,
                });
            } else {
                return res.status(400).send("No file attached.");
            }
        } catch (error: any) {
            console.log("entro al catch", error.message);

            return res.status(400).send(error.message);
        }
    }
}
