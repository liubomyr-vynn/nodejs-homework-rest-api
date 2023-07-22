import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
	"/",
	isEmptyBody,
	validateBody(contactsSchemas.addContactsSchema),
	contactsController.add,
);

// contactsRouter.put(
// 	"/:contactId",isValidId,
// 	isEmptyBody,
// 	validateBody(contactsSchemas.addContactsSchema),
// 	contactsController.updateById,
// );

// contactsRouter.delete("/:contactId",isValidId, contactsController.deleteById);

export default contactsRouter;
