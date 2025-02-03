import express from 'express';
import User from '../models/userDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.SECRET;

if(!JWT_SECRET){
    throw new Error("SECRET is missing in environment variables");
}

const userRouter = express();
userRouter.use(express.Router());

userRouter.post("/signup", async (req,res) => {
    const {username , password , name} = req.body;

    try{
        const response = await User.findOne({username : username});
        if(!response){
            const hashed_password = await bcrypt.hash(password,10);
            const user = await User.create({
                username,
                password : hashed_password,
                name
            });
            console.log(user);
            const token = await jwt.sign({userId : user._id}, JWT_SECRET);
            res.status(200).json({
                msg : "User Signed Up",
                token : token
            });
        }
        else{
            res.status(409).json({
                msg : "User already exists"
            });
            return;
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg : "Internal Server Error"
        });
    }
});


// @ts-ignore
userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ msg: "Login successful", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});


export default userRouter;