import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/User";
import { Types } from "mongoose";
import { authenticate } from "../middlewares/authenticate";
import { signToken } from "../lib/jwt-sign";

dotenv.config();
const router = express.Router();

type User = {
    id: Types.ObjectId;
    role: string;
    username: string;
}

router.get("/", authenticate, async (req:Request, res:Response) => {
    const user = req.user as User

    const token = signToken(user.id, user.role, user.username);
    res.status(200).json({ token, role: user.role, username: user.username });
})

export default router