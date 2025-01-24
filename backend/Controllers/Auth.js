const jwt= require('jsonwebtoken');
const ensureAuthenticated =(req,res,next)=>{

    //if not authorized then error else check the jwt token and send the data
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message:'unauthorized,jwt Token is required'});
    }
    // using jwt.verify method   parameters(header,secretkey)  checks if jwt correct andit is not expired then send data 
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403).json({message:'unauthorized,jwt token is required(token is wrong or expired)'});
    }
    
}

module.exports=ensureAuthenticated;