"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databseUrl = process.env.DATABASE_URL;
const mongoose_1 = __importDefault(require("mongoose"));
if (!databseUrl) {
    throw new Error('Database Url is not present in .env file');
}
mongoose_1.default.connect(databseUrl).then(() => console.log('Database is connected'));
const db = mongoose_1.default.connect;
exports.default = db;
