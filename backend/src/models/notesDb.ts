import mongoose from "mongoose";

const schema = mongoose.Schema;

const notesSchema = new schema({
    title : {
        required : true,
        type : String,
    },
    description : {
        required : true,
        type : String
    },
    image : {
        type : String
        },
    author : {
        type : schema.Types.ObjectId, 
        ref : 'User',
        required : true
    }
});

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;   
