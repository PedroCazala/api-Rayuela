"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userCollection = 'Users';
const UsersSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    // userId:  [{ type: mongoose.Types.ObjectId, ref: usersCollection, required:true }]
    creationDate: { type: Date, required: true },
    lastModifiedDate: { type: Date },
});
exports.UserModel = mongoose_1.default.model(exports.userCollection, UsersSchema);
