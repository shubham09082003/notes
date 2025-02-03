import dotenv from 'dotenv';
dotenv.config();

const databseUrl = process.env.DATABASE_URL;
import mongoose from "mongoose";

if(!databseUrl){
    throw new Error('Database Url is not present in .env file');
}

mongoose.connect(databseUrl).then(() => console.log('Database is connected'));

const db = mongoose.connect;

export default db;