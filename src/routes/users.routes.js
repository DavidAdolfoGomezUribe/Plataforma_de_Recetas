import { error } from "console";
import { Router } from "express";
const router= Router();

router.get("/",async (req,res,next)=>{
    try{
        const users = await getDB().collection("usuarios").find().toArray()
        res.json(users)
        
    }catch{
        next(error)
    }
});

export default router
