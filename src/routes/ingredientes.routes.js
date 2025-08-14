import e, { Router } from "express";
import { getDB } from "../db/config.js";
import {log} from "console"

const router = Router();

router.get("/",async(req,res)=>{
    try {
        const respuesta = await getDB().collection("ingredientes").find().toArray()
        log(respuesta)
        res.json(respuesta)
    } catch (error) {
        log(error)
        
    }
});


router.get("/:id",async(req,res)=>{
    try{
        const id = parseInt(req.params.id, 10) //en base deciamal;
        const respuesta = await getDB().collection("ingredientes").findOne({id:id} )
        res.json(respuesta)
    }catch(error){
     log(error)   
    }
})


export default router