import { Router } from "express";
import usersRouter from "./users.routes.js";
import recipesRouter from "./recipes.routes.js"
import ingredientsRouter from "./ingredientes.routes.js"

const router = Router();

router.use("/users",usersRouter);
router.use("/recipes",recipesRouter)
router.use("/ingredents",ingredientsRouter)

export default router; 