import express from "express";

import authController from "../../controllers/auth-controller.js";

import userSchemas from "../../schemas/users-schemas.js";

import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	validateBody(userSchemas.userRegisterSchema),
	authController.register,
);

export default authRouter;
