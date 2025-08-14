import { error } from "console";
import { Router } from "express";
import { getDB } from "../db/config.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(async (req, res, next) => {
    const users = await getDB().collection("usuarios").find().toArray()
    res.json(users)
}));

router.get('/:id', asyncHandler(async (req, res) => {

    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await getDB().collection('usuarios').findOne({ id: userId });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
}));



export default router


