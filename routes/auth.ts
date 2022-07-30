import express from "express";
import {authController} from "..";

const router = express.Router();

export function initAuthRoute(){
	router.post("/register",authController.register);
	router.post("/login",authController.login);
}

export default router;