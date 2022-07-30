import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import bcrypt from "bcryptjs"
import {createError} from "../utils/error";
import jwt from "jsonwebtoken";

export class AuthController{
	register = async(req:Request,res:Response,next:NextFunction) => {
		try{
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.password, salt);
			const newUser = new User({
				username:req.body.username,
				email:req.body.email,
				password:hash,
			})

			await newUser.save();
			res.status(200).send("User has been created");
		}catch(err){
			next(err);
		}
	}
	login = async(req:Request,res:Response,next:NextFunction) => {
		try{
			const user = await User.findOne({username:req.body.username});
			if(!user) return next(createError(404, "User not found"));

			const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password); // true
			if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"));
			
			const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET!);
			const {password, isAdmin, ...otherDetails} = (user as any)._doc;

			res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherDetails});
		}catch(err){
			next(err);
		}
	}
}