import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const SECRET = process.env.JWT_SECRET;
if (!SECRET) throw new Error("No jwt secret found.")

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Access denied." });
        return
    }

    try {
        const user = jwt.verify(token, SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
}