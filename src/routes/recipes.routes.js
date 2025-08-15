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
        const recipId = parseInt(req.params.id, 10);

        if (isNaN(recipId)) {
            return res.status(400).json({ message: 'Invalid recipe id' });
        }

        const result = await getDB()
            .collection('recetas')
            .deleteOne({ id: recipId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Delete recipe ok' });
    })
);

//crear una receta

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { titulo, descripcion, ingredientes } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const db = getDB();
    const recetasCollection = db.collection('recetas');

    const lastRecipe = await recetasCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId = lastRecipe.length > 0 ? lastRecipe[0].id + 1 : 1;

    const nuevaReceta = {
      id: newId,
      titulo,
      descripcion,
      ingredientes: Array.isArray(ingredientes) ? ingredientes : [],
      createdAt: new Date(),
    };

    const result = await recetasCollection.insertOne(nuevaReceta);

    res.status(201).json({
      message: 'Recipe created successfully',
      receta: { ...nuevaReceta, _id: result.insertedId },
    });
  })
);

//edit title and description
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const recetaId = parseInt(req.params.id, 10);
    const { titulo, descripcion } = req.body;

    if (isNaN(recetaId)) {
      return res.status(400).json({ message: 'Invalid recipe id' });
    }

    if (!titulo && !descripcion) {
      return res.status(400).json({ message: 'You must provide a title or description to update' });
    }

    const updateFields = {};
    if (titulo) updateFields.titulo = titulo;
    if (descripcion) updateFields.descripcion = descripcion;

    
    const result = await getDB()
      .collection('recetas')
      .updateOne({ id: recetaId }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe updated successfully' });
  })
);



export default router