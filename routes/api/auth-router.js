import express from "express";

import authController from "../../controllers/auth-controller.js";

import userSchemas from "../../schemas/users-schemas.js";

import { validateBody } from "../../decorators/index.js";

import { upload, authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	validateBody(userSchemas.userRegisterSchema),
	authController.register,
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
	"/verify",
	validateBody(userSchemas.userEmailSchema),
	authController.resendVerifyEmail,
);

authRouter.post(
	"/login",
	validateBody(userSchemas.userRegisterSchema),
	authController.login,
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
	"/avatars",
	upload.single("avatar"),
	authenticate,
	authController.updateAvatar,
);

export default authRouter;
