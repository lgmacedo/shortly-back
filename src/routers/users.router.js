import { Router } from "express";

import validateSchema from "../middlewares/validateSchema.middleware.js";
import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";
import signUpSchema from "../schemas/signUpSchema.schema.js";
import signInSchema from "../schemas/signInSchema.schema.js";

import { getRanking, getUserData, signIn, signUp } from "../controllers/users.controller.js";

const usersRouter = Router();
usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/users/me", checkAuthorization, getUserData);
usersRouter.get("/ranking", getRanking);

export default usersRouter;