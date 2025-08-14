import { error } from "console";
import { Router } from "express";
import { getDB } from "../db/config.js";
import asyncHandler from "../utils/asyncHandler.js";

const router= Router();

router.get("/",asyncHandler( async (req,res,next)=>{
    const users = await getDB().collection("usuarios").find().toArray()
    res.json(users)
}));

export default router
