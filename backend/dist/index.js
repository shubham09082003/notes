"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Welcome to the Notes API"
    });
});
app.use('/user', userRoutes_1.default);
app.use('/notes', noteRoutes_1.default);
app.listen(PORT, () => {
    db_1.default;
    console.log(`Server is running in port ${PORT}`);
});
