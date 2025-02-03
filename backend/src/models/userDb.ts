import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    username : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    name : {
        required : true,
        type : String
    },
});

const User = mongoose.model('User', userSchema);

export default User;


