import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute, {initAuthRoute} from "./routes/auth";
import usersRoute, {initUserRoute} from "./routes/users";
import hotelsRoute, {initHotelRoute} from "./routes/hotels";
import roomsRoute, {initRoomRoute} from "./routes/rooms";
import {AuthController} from "./controllers/AuthController";
import {HotelController} from "./controllers/HotelController";
import cookieParser from "cookie-parser";
import {UserController} from "./controllers/UserController";
import {RoomController} from "./controllers/RoomController";
import cors from "cors";
const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO!);
		console.log("Connected to mongoDB");
	} catch (error) {
		throw error; 
	}
}

mongoose.connection.on("disconnected",() => {
	console.log("mongoDB disconnected");
})

mongoose.connection.on("connected", () => {
	console.log("mongoDB connected");
})
// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

export const authController = new AuthController();
export const hotelController = new HotelController();
export const userController = new UserController();
export const roomController = new RoomController();

initAuthRoute();
initHotelRoute();
initUserRoute();
initRoomRoute();
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong"; 
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
})

app.listen(8090,() => {
	connect();
	console.log("Listening to http://localhost:8090 in backend");
})