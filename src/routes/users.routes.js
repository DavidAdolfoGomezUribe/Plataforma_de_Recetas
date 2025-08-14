import { error } from "console";
import { Router } from "express";
import { getDB } from "../db/config.js";
import asyncHandler from "../utils/asyncHandler.js";
import { log } from "console";

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

router.post("/", asyncHandler(async (req, res, next) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: 'Nombre es requerido' });
    }

    const db = getDB();
    const usuariosCollection = db.collection('usuarios');


    const lastUser = await usuariosCollection
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray();

    const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

    const newUser = {
        id: newId,
        nombre,
        recetas: [],
    };

    const result = await usuariosCollection.insertOne(newUser);
    log(result)
    res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: newUser,
    });

}))



export default router


