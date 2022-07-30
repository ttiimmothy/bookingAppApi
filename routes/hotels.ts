import express from "express";
import {hotelController} from "..";
import {verifyAdmin} from "../utils/verifyToken";

const router = express.Router();

export function initHotelRoute(){
	// CREATE
	router.post("/",verifyAdmin,hotelController.createHotel);
	// UPDATE
	router.put("/:id",verifyAdmin,hotelController.updateHotel);
	// DELETE
	router.delete("/:id",verifyAdmin,hotelController.deleteHotel);
	// GET
	router.get("/find/:id",hotelController.getHotel);
	// GET ALL
	router.get("/",hotelController.getHotels);
	router.get("/countByCity", hotelController.countByCIty);
	router.get("/countByType", hotelController.countByType);
	router.get("/room/:id", hotelController.getHotelRooms);
}

export default router;