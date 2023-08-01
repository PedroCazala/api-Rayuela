"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connectMongoDb = () => {
    try {
        mongoose_1.default.connect(/* `mongodb+srv://pedro:${process.env.MONGO_PASSWORD}@cluster0.tugf9.mongodb.net/rayuela?retryWrites=true&w=majority`  ||  */ `mongodb://localhost:27017/rayu`, options, () => console.log(`MongoDb is connected ${1 + 2}`));
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectMongoDb = connectMongoDb;
