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
exports.UserModel = exports.userCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userCollection = 'Users';
const UsersSchema = new mongoose_1.default.Schema({
    lastModifiedDate: { type: Date },
    creationDate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    rol: { type: String, enum: ['user', 'admin'], require: true },
    cartId: { type: mongoose_1.default.Schema.Types.ObjectId },
    name: { type: String },
    lastName: { type: String },
    direction: {
        address: { type: String },
        city: { type: String },
        prov: { type: String },
        CP: { type: Number },
    },
    phone: { type: Number },
    img: { type: String },
    dateBird: { type: Date },
});
UsersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcryptjs_1.default.hash(this.password, 10);
        this.password = hash;
        next();
    });
});
UsersSchema.methods.IsValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const compare = yield bcryptjs_1.default.compare(password, user.password);
        return compare;
    });
};
exports.UserModel = mongoose_1.default.model(exports.userCollection, UsersSchema);
