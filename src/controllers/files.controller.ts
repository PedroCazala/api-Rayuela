// import { initializeApp } from "firebase-admin";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { firebaseConfig } from "../config/firebase.config";
// import multer from "multer";

// // const router: Router = Router();
// initializeApp(firebaseConfig)

// const storage =getStorage()

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }

// export class FilesController {
//     static async addPictureUser(req:Request,res:Response){
//         try {
//             const dateTime = giveCurrentDateTime();
//             if (req.file){
//                 const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);
        
//                 // Create file metadata including the content type
//                 const metadata = {
//                     contentType: req.file.mimetype,
//                 };
        
//                 // Upload the file in the bucket storage
//                 const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//                 //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
        
//                 // Grab the public url
//                 const downloadURL = await getDownloadURL(snapshot.ref);
        
//                 console.log('File successfully uploaded.');
//                 return res.send({
//                     message: 'file uploaded to firebase storage',
//                     name: req.file.originalname,
//                     type: req.file.mimetype,
//                     downloadURL: downloadURL
//                 })
//             }else{
//                 return res.status(400).send('No file attached.');
//             }
//         } catch (error:any) {
//             return res.status(400).send(error.message)
//         }
//     }
// }
// // const upload = multer({ storage: multer.memoryStorage() });

// // router.post('/imgUser',upload.single("filename"),async(req,res)=>{
// //     try {
// //         const dateTime = giveCurrentDateTime();
// //         if (req.file){
// //             const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);
    
// //             // Create file metadata including the content type
// //             const metadata = {
// //                 contentType: req.file.mimetype,
// //             };
    
// //             // Upload the file in the bucket storage
// //             const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
// //             //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
    
// //             // Grab the public url
// //             const downloadURL = await getDownloadURL(snapshot.ref);
    
// //             console.log('File successfully uploaded.');
// //             return res.send({
// //                 message: 'file uploaded to firebase storage',
// //                 name: req.file.originalname,
// //                 type: req.file.mimetype,
// //                 downloadURL: downloadURL
// //             })
// //         }
        
// //     } catch (error:any) {
// //         return res.status(400).send(error.message)
// //     }
// // })
import { Router, Request, Response } from "express";

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firebaseConfig } from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { UserController } from "./user.controller";
import { UserService } from "../services/user.services";

initializeApp(firebaseConfig)
const storage = getStorage()

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

export class FilesController {
    static async addPictureUser(req:Request, res:Response) {
        try {
            const {idUser} = req.params
            const dateTime = giveCurrentDateTime();
            if (req.file) {
                const storageRef = ref(storage, `users/${req.file.originalname + " " + dateTime}`);

                                // Create file metadata including the content type
                const metadata = {
                    contentType: req.file.mimetype,
                };
        
                // Upload the file in the bucket storage
                const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
                //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
        
                // Grab the public url
                const downloadURL = await getDownloadURL(snapshot.ref);
        
                console.log('File successfully uploaded.');

                console.log('File successfully uploaded.');
                await UserService.UpdateImgUser(idUser,downloadURL)
                return res.send({
                    message: 'file uploaded to firebase storage',
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    downloadURL: downloadURL
                });
            } else {
                return res.status(400).send('No file attached.');
            }
        } catch (error:any) {
            console.log('entro al catch',error.message);
            
            return res.status(400).send(error.message);
        }
    }
}
