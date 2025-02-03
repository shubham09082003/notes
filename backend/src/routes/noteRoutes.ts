import express, { Request, Response, NextFunction } from 'express';
import Notes  from '../models/notesDb';
import { middleware } from '../middleware/middleware';


const noteRouter = express.Router();                    

interface AuthRequest extends express.Request { 
    userId?: string;
}

noteRouter.get('/', middleware, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const notes = await Notes.findOne({author: userId});
        res.status(200).json(notes);
    } catch(e) {
        res.status(500).json({message: "Internal server error"});
    }
});

noteRouter.post('/', middleware, async (req : AuthRequest, res : Response) => {
    const {title, description , image} = req.body;
    const author = req.userId;
    try{
        const note = await Notes.create({title, description , image, author});
        res.status(200).json(note);
    }catch(e){
        console.log(e);
        res.status(500).json({message : "Internal server error"});
    }


});

noteRouter.delete('/:id', middleware, async (req : AuthRequest, res : Response) => {
    const {id} = req.params;
    const userId = req.userId;
    const note = await Notes.findOneAndDelete({_id : id, author : userId});
    res.status(200).json(note);
});

noteRouter.put('/:id', middleware, async (req : AuthRequest, res : Response) => {
    const {id} = req.params;
    const userId = req.userId;
    const {title, description, image} = req.body;
    try{
        const note = await Notes.findOneAndUpdate({_id : id, author : userId}, {title, description, image});
        res.status(200).json(note);
    }catch(e){
        console.log(e);
        res.status(500).json({message : "Internal server error"});
    }
});

noteRouter.get('/:id', middleware, async (req : AuthRequest, res : Response) => {
    const {id} = req.params;
    const userId = req.userId;
    try{
        const note = await Notes.findOne({_id : id, author : userId});
        res.status(200).json(note);
    }catch(e){
        res.status(500).json({message : "Internal server error"});
    }
});

export default noteRouter;
