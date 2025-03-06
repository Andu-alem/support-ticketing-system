import { Request, Response, NextFunction } from "express";
import User from "../models/User"

interface UserToken {
    id?: string,
    role?: string
}

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    const userToken: UserToken|undefined = req.user;
    try {
        const user = await User.findOne({ _id: userToken?.id });
        if (user && user.role === "admin") {
            next()
        } else {
            throw new Error("Access denied");
        }
    } catch (error) {
        res.status(400).json({ message: "Access Denied" })
    }
}