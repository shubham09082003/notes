"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const notesSchema = new schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String
    },
    image: {
        type: String
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Notes = mongoose_1.default.model('Notes', notesSchema);
exports.default = Notes;
