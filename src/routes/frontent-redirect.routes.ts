import express from "express";

const FrontendRedirectRoute = express.Router();

// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// export const storage =getStorage()
const urlFront =process.env.FRONTEND_URL
FrontendRedirectRoute.get(
    "/",
    (req,res)=>
    res.redirect(`${urlFront}`)
);


export { FrontendRedirectRoute };
