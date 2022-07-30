import express from "express";
import {roomController} from "..";
import {verifyAdmin} from "../utils/verifyToken";

const router = express.Router();

export function initRoomRoute(){
	// CREATE
	router.post("/:hotelId",verifyAdmin,roomController.createRoom);
	// UPDATE
	router.put("/:id",verifyAdmin,roomController.updateRoom);
	router.put("/availability/:id",roomController.updateRoomAvailability);
	// DELETE
	router.delete("/:id/:hotelId",verifyAdmin,roomController.deleteRoom);
	// GET
	router.get("/:id",roomController.getRoom);
	// GET ALL
	router.get("/",roomController.getRooms);
}
	
export default router;