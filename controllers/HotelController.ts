import {NextFunction, Request, Response} from "express";
import Hotel from "../models/Hotel";
import Room from "../models/Room";

export class HotelController{
	createHotel = async(req:Request,res:Response,next:NextFunction) => {
		const newHotel = new Hotel(req.body);
	
		try{
			const savedHotel = await newHotel.save();
			res.status(200).json(savedHotel);
		}catch(err){
			next(err);
		}
	}
	
	updateHotel = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			// {new:true} is to show the most updated version for res.json
			const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
			res.status(200).json(updatedHotel);
		}catch(err){
			next(err);
		}
	}
	
	deleteHotel = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			await Hotel.findByIdAndDelete(req.params.id);
			res.status(200).json("Hotel has been deleted");
		}catch(err){
			next(err);
		}
	}
	
	getHotel = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const hotel = await Hotel.findById(req.params.id);
			res.status(200).json(hotel);
		}catch(err){
			next(err);
		}
	}
	
	getHotels = async (req:Request,res:Response,next:NextFunction)=>{
		const {min, max, ...others} = req.query;
		try{
			const hotels = await Hotel.find({...others, cheapestPrice: {$gt:min || 1, $lt:max || 999}}).limit(parseInt(req.query.limit as string));
			res.status(200).json(hotels);
		}catch(err){
			next(err);
		}
	}

	countByCIty = async (req:Request,res:Response,next:NextFunction)=>{
		const cities = (req.query.cities as string).split(",");
		try{
			const list = await Promise.all(cities.map((city) => {
				return Hotel.countDocuments({city});
			}))
			res.status(200).json(list);
		}catch(err){
			next(err);
		}
	}

	countByType = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const hotelCount = await Hotel.countDocuments({type:"hotel"});
			const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
			const resortCount = await Hotel.countDocuments({ type: "resort" });
			const villaCount = await Hotel.countDocuments({ type: "villa" });
			const cabinCount = await Hotel.countDocuments({ type: "cabin" });
			res.status(200).json([
				{type:"hotel", count:hotelCount},
				{ type: "apartments", count: apartmentCount },
				{ type: "resorts", count: resortCount },
				{ type: "villas", count: villaCount },
				{ type: "cabins", count: cabinCount },
			]);
		}catch(err){
			next(err);
		}
	}

	getHotelRooms = async (req:Request,res:Response,next:NextFunction)=>{
		try{
			const hotel = await Hotel.findById(req.params.id);
			const list = await Promise.all((hotel as any).rooms.map((room:any)=>{
				return Room.findById(room);
			}))
			res.status(200).json(list);
		}catch(err){
			next(err);
		}
	}
}