import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { SubProductsService } from "../services/subProducts.services";
import { UserService } from "./user.services";

initializeApp(firebaseConfig);
const storage = getStorage();
interface Prods {
    idSubProduct: string;
    files: Express.Multer.File[];
}
interface ProdsAddImgUser {
    idUser: string;
    file: Express.Multer.File;
}
const giveCurrentDateTime = () => {
    const today = new Date();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
};
export class FilesService {
    static async addPictureUser({ idUser, file }: ProdsAddImgUser) {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(
            storage,
            `users/${file.originalname + " " + dateTime}`
        );

        // Create file metadata including the content type
        const metadata = {
            contentType: file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        );
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("File successfully uploaded.");

        console.log("File successfully uploaded.");
        await UserService.UpdateImgUser(idUser, downloadURL);
        return downloadURL
    }
    static async addPicturesSubProducts({ idSubProduct, files }: Prods) {
        const dateTime = giveCurrentDateTime();

        console.log("existen los archivos");
        for (const file of files) {
            const storageRef = ref(
                storage,
                `sub-products/${file.originalname + " " + dateTime}`
            );

            // Create file metadata including the content type
            const metadata = {
                contentType: file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(
                storageRef,
                file.buffer,
                metadata
            );
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log("File successfully uploaded.");

            console.log("File successfully uploaded.");
            await SubProductsService.addImgSubProduct(
                idSubProduct,
                downloadURL
            );
        }
    }
}
