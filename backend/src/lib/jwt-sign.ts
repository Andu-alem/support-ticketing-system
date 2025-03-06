import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

// Generate JWT Token
export const signToken = (id: Types.ObjectId, role: string, username: string) => {
    return jwt.sign({ id, role, username }, process.env.JWT_SECRET as jwt.Secret, {
      expiresIn: "2h",
    });
};