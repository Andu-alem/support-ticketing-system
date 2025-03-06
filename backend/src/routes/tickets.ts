import express, { Request, Response } from "express";
import Ticket from "../models/Ticket";
import { authorize } from "../middlewares/authorize";
import { Types } from "mongoose";

const router = express.Router();

type User = {
    id: Types.ObjectId;
    role: string;
}

router.get('/', async (req: Request, res: Response) => {
    const user = req.user as User;
    try {
        if (user?.role === "admin") {
            const tickets = await Ticket.find().populate('issuer').sort({ createdAt: -1 });
            res.json({ tickets });
        } else {
            const tickets = await Ticket.find({
                issuer: user.id
            }).sort({ createdAt: -1 });
            res.json({ tickets });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occured." })
    }
});


router.post('/', async (req: Request, res: Response) => {
    const user = req.user as User;
    const { title, description } = req.body;
    try {
        const ticket = await Ticket.create({
            title,
            description,
            issuer: user.id
        })
        res.status(201).json("Ticket created successfuly.");
    } catch (error) {
        res.status(500).json("Error occured while issuing ticket.")
    }
});


router.put('/:id', authorize, async (req: Request, res: Response) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
        const ticket = await Ticket.findOneAndUpdate({ _id: id }, { status });
        res.status(201).json({
            message: "Updated successfully",
            ticket
        });
    } catch (error) {
        res.status(500).json("Error occured.");
    }
});

export default router