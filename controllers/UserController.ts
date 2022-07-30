import {NextFunction, Request, Response} from "express";
import User from "../models/User";

export class UserController{
	updateUser = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
			res.status(200).json(updatedUser);
		}catch(err){
			next(err);
		}
	}
	
	deleteUser = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("User has been deleted");
		}catch(err){
			next(err);
		}
	}
	
	getUser = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const user = await User.findById(req.params.id);
			res.status(200).json(user);
		}catch(err){
			next(err);
		}
	}
	
	getUsers = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const users = await User.find();
			res.status(200).json(users);
		}catch(err){
			next(err);
		}
	}
}