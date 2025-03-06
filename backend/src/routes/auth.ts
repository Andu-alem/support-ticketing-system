import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import User from "../models/User";
import { signToken } from "../lib/jwt-sign";

dotenv.config();
const router = express.Router();

// compare password
const comparePassword = async (password1: string, password2: string) => {
    return bcrypt.compare(password1, password2);
}


// Register
router.post("/signup", async (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;
    try {
      let user = await User.findOne({ username });
      if (user) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
  
      user = new User({ username, email, password, role });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
});
  
  // Login
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }
  
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
        return;
      }
  
      const token = signToken(user._id, user.role, user.username);
      res.status(200).json({ token, role: user.role, username: user.username });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
});
  
export default router;