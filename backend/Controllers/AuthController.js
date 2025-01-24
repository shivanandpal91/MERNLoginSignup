const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");

const login = async (req,res)=>{
    try{
        const  { email, password}=req.body;
        //check if user exist yes-> check if correct password
        const user=await UserModel.findOne({email});
        const errorMessage='Auth Failed, Email or password is wrong!';
        if(!user){
            return res.status(403).json({message:errorMessage,success:false});
        }

       //check password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({message:errorMessage,success:false});
        }

        // if password is correct then create jwt token
        // parameter -> payload, jwtsecret key and expire time
        const jwtToken= await jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        //return jwt token
        
        res.status(200)
        .json({
            message:'login successful',
            success:true,
            jwtToken,
            email,
            name:user.name
        })
    }catch(err){
        res.status(500)
        .json({
            message:'Internal server error',
            success:false
        })
    }
}

const signup = async (req,res)=>{
    try{
        const  { name , email, password}=req.body;
        //check if user exist
        const user=await UserModel.findOne({email});
        if(user){
            //409 conflict status
            return res.status(409).json({message:'User already exist',success:false});
        }
        // This creates a new document (instance) of the UserModel using the provided values for name, email, and password.
        // //not yet saved in db we can ... save ,access etc ...
        const userModel=new UserModel({name,email,password});
        //encrypt and save
        userModel.password=await bcrypt.hash(password,10);
        userModel.save();
        res.status(201)
        .json({
            message:'Signup successful',
            success:true
        })

        //check password
        //generate token
    }catch(err){
        res.status(500)
        .json({
            message:'Internal server error',
            success:false
        })
    }
}
module.exports =
 {
    signup,
    login
 }