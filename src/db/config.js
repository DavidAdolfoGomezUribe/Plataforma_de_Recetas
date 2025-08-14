//imports 
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { log } from "console";

//recibing environment variables from .env
dotenv.config();

const URI = process.env.MONGO_URI
const DB_NAME=process.env.DB_NAME

const client = new MongoClient(URI)

let db;

export async function connect() {
    try {
        await client.connect();
        log("succesful conection")
        db = client.db(DB_NAME)
    } catch (error) {
        log("message:"+error)
    }
}

export function getDB(){
    if(!db){
        throw new Error("Data not found")
    }
    return db;
}





