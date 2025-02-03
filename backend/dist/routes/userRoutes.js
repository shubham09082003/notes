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
const express_1 = __importDefault(require("express"));
const userDb_1 = __importDefault(require("../models/userDb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.SECRET;
if (!JWT_SECRET) {
    throw new Error("SECRET is missing in environment variables");
}
const userRouter = (0, express_1.default)();
userRouter.use(express_1.default.Router());
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name } = req.body;
    try {
        const response = yield userDb_1.default.findOne({ username: username });
        if (!response) {
            const hashed_password = yield bcrypt_1.default.hash(password, 10);
            const user = yield userDb_1.default.create({
                username,
                password: hashed_password,
                name
            });
            console.log(user);
            const token = yield jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET);
            res.status(200).json({
                msg: "User Signed Up",
                token: token
            });
        }
        else {
            res.status(409).json({
                msg: "User already exists"
            });
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}));
// @ts-ignore
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield userDb_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ msg: "Login successful", token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}));
exports.default = userRouter;
