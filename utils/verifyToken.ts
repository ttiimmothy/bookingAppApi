import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/models";
import {createError} from "./error";

export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
	const token = req.cookies.access_token;
	if(!token){
		return next(createError(401, "You are not authenticated"));
	}

	jwt.verify(token,process.env.JWT_SECRET!,(err:any,user:User) => {
		if(err) return next(createError(403, "Token is not valid"));
		req.user = user;
		next();
	})
}

export const verifyUser = (req:Request,res:Response,next:NextFunction) => {
	verifyToken(req,res,()=>{
		if((req.user && req.user.id === req.params.id) || req.user?.isAdmin){
			next();
		} else {
			return next(createError(403, "You are not authorized"));
		}
	})
}

export const verifyAdmin = (req:Request,res:Response,next:NextFunction) => {
	verifyToken(req,res,()=>{
		if(req.user?.isAdmin){
			next();
		} else {
			return next(createError(403, "You are not authorized"));
		}
	})
}