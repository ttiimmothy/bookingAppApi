import express from "express";
import {userController} from "..";
import {verifyAdmin, verifyUser} from "../utils/verifyToken";

const router = express.Router();

export function initUserRoute(){
	// router.get("/checkauthenticate",verifyToken,(req,res,next)=>{
	// 	res.send("Hello user, you are logged in")
	// })
	// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
	// 	res.send("Hello user, you are logged in and you can delete you account")
	// })
	// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
	// 	res.send("Hello user, you are logged in and you can delete all accounts")
	// })

	// UPDATE
	router.put("/:id",verifyUser,userController.updateUser);
	// DELETE
	router.delete("/:id",verifyUser,userController.deleteUser);
	// GET
	router.get("/:id",verifyUser,userController.getUser);
	// GET ALL
	router.get("/",verifyAdmin,userController.getUsers);
}

export default router;