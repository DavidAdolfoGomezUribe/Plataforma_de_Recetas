import { error } from "console";
import { Router } from "express";
import { getDB } from "../db/config.js";
import asyncHandler from "../utils/asyncHandler.js";
import { log } from "console";


const router = Router();

//- Listar todas las recetas disponibles en la plataforma.
//Get all recipes
router.get("/", asyncHandler(async (req, res, next) => {
    const users = await getDB().collection("recetas").find().toArray()
    res.json(users)
}));

//Consultar una receta en específico con todos sus ingredientes.
//Get recipes for id
router.get('/:id', asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);

    if (isNaN(recipeId)) {
        return res.status(400).json({ message: 'Invalid recipe id' });
    }

    const recipe = await getDB().collection('recetas').findOne({ id: recipeId });

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
}));

//Eliminar una receta.
//deleting one recipe by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid recipe id' });
        }

        const result = await getDB()
            .collection('usuarios')
            .deleteOne({ id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Delete recipe ok' });
    })
);
//en desarrollo
//crear una receta
router.post(
    '/:id/recetas',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const { titulo, descripcion, ingredientes } = req.body;

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        if (!titulo || !descripcion) {
            return res.status(400).json({ message: 'Tittle and description its required' });
        }

        
        const nuevaReceta = {
            titulo,
            descripcion,
            ingredientes: Array.isArray(ingredientes) ? ingredientes : []
        };

        
        const result = await getDB()
            .collection('usuarios')
            .updateOne(
                { id: userId },
                { $push: { recetas: nuevaReceta } }
            );


        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: 'Recip creation ok',
            receta: nuevaReceta,
        });
    })
);


export default router