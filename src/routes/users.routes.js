
import { Router } from "express";
import { getDB } from "../db/config.js";
import asyncHandler from "../utils/asyncHandler.js";//para evitar el uso execivo de trycath
import { log } from "console";

const router = Router();
//Get all users
router.get("/", asyncHandler(async (req, res, next) => {
    const users = await getDB().collection("usuarios").find().toArray()
    res.json(users)
}));

//Get one user by id
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

//Create a new user

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
        message: "Creating user ok",
        user: newUser,
    });

}))


// Update one user by id
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const { nombre } = req.body;

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        if (!nombre) {
            return res.status(400).json({ message: 'Nombre es requerido' });
        }

        const result = await getDB()
            .collection('usuarios')
            .updateOne({ id: userId }, { $set: { nombre } });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Updating user ok' });
    })
);

//deleting one user by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const result = await getDB()
            .collection('usuarios')
            .deleteOne({ id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Delete user ok' });
    })
);

//Adding new recipt

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

// GET /api/users/:id/recetas
router.get(
  '/:id/recetas',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ message: 'Invalid user id' });

    const user = await getDB().collection('usuarios').findOne(
      { id: userId },
      { projection: { _id: 0, recetas: 1 } } 
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.recetas ?? []);
  })
);

// GET /api/users/by-name/:nombre/recetas
router.get(
  '/by-name/:nombre/recetas',
  asyncHandler(async (req, res) => {
    const { nombre } = req.params;

    const user = await getDB()
      .collection('usuarios')
      .findOne({ nombre:nombre }, { projection: { _id: 0, recetas: 1 } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.recetas ?? []);
    
  })
);




export default router


