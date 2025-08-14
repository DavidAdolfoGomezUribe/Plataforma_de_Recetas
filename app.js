//disclaimer , all the proyect will be in english
import {connect,getDB} from "./src/db/config.js"
import {log} from "console"
log("ok")

await connect()
const db = await getDB().collection("ingredientes").find().toArray()
log(db)


