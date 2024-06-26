import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.model.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
     //this will get soted in {user}=req.body 
     req.user = await User.findById(decoded.userId).select("-password");
     next()
   } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("NOT AUTHORIZED, TOKEN FAILED");
   }
  } else {
    res.status(401);
    throw new Error("NOT AUTHORIZED");
  }
});

//admin middleware
const admin =(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error("NOT AUTHORIZED AS ADMIN");
    }
}

export {admin,protect}


