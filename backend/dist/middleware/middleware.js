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
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.SECRET;
if (!JWT_SECRET) {
    throw new Error("SECRET is missing in environment variables");
}
// @ts-ignore
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        console.log(token);
        if (!token) {
            res.status(401).json({
                msg: "Access Denied. Token is not provided"
            });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decode);
        if (typeof decode === 'object' && decode !== null && 'userId' in decode) {
            req.userId = decode.userId;
            next();
        }
        else {
            res.status(401).json({ msg: "Invalid token structure" });
            return;
        }
    }
    catch (e) {
        console.error("Authentication error:", e);
        res.status(401).json({ msg: "Invalid or expired token" });
        return;
    }
});
exports.middleware = middleware;
