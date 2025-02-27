import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.use(authorize);

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);

export default usersRouter;
