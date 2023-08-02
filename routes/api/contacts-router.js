import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import {
	upload,
	isEmptyBody,
	isEmptyFavoriteBody,
	isValidId,
	authenticate,
} from "../../middlewares/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
	"/",
	upload.single("avatar"),
	isEmptyBody,
	validateBody(contactsSchemas.addContactsSchema),
	contactsController.add,
);

contactsRouter.put(
	"/:contactId",
	isValidId,
	isEmptyBody,
	validateBody(contactsSchemas.addContactsSchema),
	contactsController.updateById,
);

contactsRouter.patch(
	"/:contactId/favorite",
	isValidId,
	isEmptyFavoriteBody,
	validateBody(contactsSchemas.contactUpdateFavoriteSchema),
	contactsController.updateStatusContact,
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

export default contactsRouter;
