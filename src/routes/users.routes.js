import { error } from "console";
import { Router } from "express";
import { getDB } from "../db/config.js";
const router= Router();

router.get("/",async (req,res,next)=>{
    try{
        const users = await getDB().collection("usuarios").find().toArray()
        res.json(users)
        
    }catch (error){
        next(error)
    }
});

export default router
