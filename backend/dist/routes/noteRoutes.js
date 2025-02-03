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
const notesDb_1 = __importDefault(require("../models/notesDb"));
const middleware_1 = require("../middleware/middleware");
const noteRouter = express_1.default.Router();
noteRouter.get('/', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const notes = yield notesDb_1.default.findOne({ author: userId });
        res.status(200).json(notes);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
noteRouter.post('/', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image } = req.body;
    const author = req.userId;
    try {
        const note = yield notesDb_1.default.create({ title, description, image, author });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
noteRouter.delete('/:id', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    const note = yield notesDb_1.default.findOneAndDelete({ _id: id, author: userId });
    res.status(200).json(note);
}));
noteRouter.put('/:id', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, image } = req.body;
    try {
        const note = yield notesDb_1.default.findOneAndUpdate({ _id: id, author: userId }, { title, description, image });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
noteRouter.get('/:id', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const note = yield notesDb_1.default.findOne({ _id: id, author: userId });
        res.status(200).json(note);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = noteRouter;
