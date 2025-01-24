const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


//This creates a Mongoose model named 'users' based on the provided userSchema.
// This stores the created model in the variable UserModel.
// The UserModel can now be used to perform CRUD (Create, Read, Update, Delete) operations on the users collection in the MongoDB database.
const UserModel=mongoose.model('users',userSchema);
module.exports=UserModel;