import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody } from "../../middlewares/idex.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
	"/",
	isEmptyBody,
	validateBody(contactsSchemas.addContactsSchema),
	contactsController.add,
);

contactsRouter.put(
	"/:contactId",
	isEmptyBody,
	validateBody(contactsSchemas.addContactsSchema),
	contactsController.updateById,
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
