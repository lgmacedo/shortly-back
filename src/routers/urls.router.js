import { Router } from "express";

import validateSchema from "../middlewares/validateSchema.middleware.js";
import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

import urlSchema from "../schemas/urlSchema.schema.js";

import { urlShortening } from "../controllers/urls.controller.js";

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validateSchema(urlSchema), checkAuthorization, urlShortening);

export default urlsRouter;