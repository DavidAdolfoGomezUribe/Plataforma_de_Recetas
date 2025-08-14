//disclaimer , all the proyect will be in english
import express from "express"
import {connect,getDB} from "./src/db/config.js"
import {log} from "console"
import apiRouter from "./src/routes/index.js"



// const db = await getDB().collection("ingredientes").find().toArray()
// log(db)

const PORT = process.env.PORT||3000
const app = express();

app.use(express.json());

app.use("/api",apiRouter);

app.get("/api",(_req,res)=> res.send({status:"ok"}))

await connect().then(()=>{
    
    app.listen(PORT,()=>{
        log(`Api in http://localhost:${PORT}`)
    })
})

