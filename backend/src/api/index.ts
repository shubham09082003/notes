// /api/index.ts

import express from 'express';
import db from '../config/db';
import userRouter from '../routes/userRoutes';
import cors from 'cors';
import noteRouter from '../routes/noteRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Welcome to the Notes API"
    });
});

app.use('/user', userRouter);
app.use('/notes', noteRouter);

export default app;
