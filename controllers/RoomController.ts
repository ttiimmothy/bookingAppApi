import {NextFunction, Request, Response} from "express";
import Hotel from "../models/Hotel";
import Room from "../models/Room";

export class RoomController{
	createRoom = async(req: Request, res: Response, next: NextFunction) => {
		const hotelId = req.params.hotelId;
		const newRoom = new Room(req.body);
		
		try{
			const savedRoom = await newRoom.save();
			try{
				await Hotel.findByIdAndUpdate(hotelId,{
					$push:{rooms: savedRoom._id as any},
				})
			} catch(err) {
				next(err);
			}

			res.status(200).json(savedRoom);
		} catch(err) {
			next(err);
		}
	}

	updateRoom = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
			res.status(200).json(updatedRoom);
		}catch(err){
			next(err);
		}
	}

	updateRoomAvailability = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			await Room.updateOne({"roomNumbers._id": req.params.id},{
				$push:{
					// for updating multiple properties
					"roomNumbers.$.unavailableDates": req.body.dates,
				},
			});
			res.status(200).json("Room status has been updated");
		}catch(err){
			next(err);
		}
	}
	
	deleteRoom = async (req:Request,res:Response,next:NextFunction)=>{
		const hotelId = req.params.hotelId;
		try{
			await Room.findByIdAndDelete(req.params.id);
			try{
				await Hotel.findByIdAndUpdate(hotelId,{
					$pull:{rooms: req.params.id},
				})
			} catch(err) {
				next(err);
			}
			res.status(200).json("Room has been deleted");
		}catch(err){
			next(err);
		}
	}
	
	getRoom = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const room = await Room.findById(req.params.id);
			res.status(200).json(room);
		}catch(err){
			next(err);
		}
	}
	
	getRooms = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const rooms = await Room.find();
			res.status(200).json(rooms);
		}catch(err){
			next(err);
		}
	}
}