//this middel ware varify
import {ApiError} from "../utils/ApiError";
import jwt, { decode } from 'jsonwebtoken';
import {asyncHandler} from "..utils/asyncHandler";
import {User} from "../models/user.model.js" 

export const varifyJWt=asyncHandler(async(req,res,next)=>{
   try {
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
 
    if(!token){
     throw new ApiError(401,"Unauthorized request")
    }
 
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
    const User=await User.findById(decodedToken?._id).select("-password -refreshToken")
 
    if(!User){
     throw new ApiError(401,"invalid Access TOken")
 
    }
    req.user =User;
    next();
   } catch (error) {
    throw new ApiError(401,error?.message||"invalid  access token ")

   }

})