"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRedirectRoute = void 0;
const express_1 = __importDefault(require("express"));
const FrontendRedirectRoute = express_1.default.Router();
exports.FrontendRedirectRoute = FrontendRedirectRoute;
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// export const storage =getStorage()
const urlFront = process.env.FRONTEND_URL;
FrontendRedirectRoute.get("/", (req, res) => res.redirect(`${urlFront}`));
