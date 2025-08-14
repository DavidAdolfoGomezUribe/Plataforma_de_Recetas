//imports 
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { log } from "console";

//recibing environment variables from .env
dotenv.config();

const URI = process.env.MONGO_URI//cluster
const DB_NAME=process.env.DB_NAME //nombre de la base de datos (recetario)

const client = new MongoClient(URI) //inicia un nuevo cliente 

let db; // establece una variable vacia para la base de datos

//para conectar a la base de datos
export async function connect() {
    try {
        await client.connect();
        log("succesful conection")
        db = client.db(DB_NAME)
        
    } catch (error) {
        log("message:"+error)
    }
}

//obetner la base de datos espeficica
export function getDB(){
    if(!db){
        throw new Error("Data not found")
    }
    return db;
}







