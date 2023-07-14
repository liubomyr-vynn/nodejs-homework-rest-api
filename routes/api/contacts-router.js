import express from "express";

import Joi from "joi";

import contactsService from "../../models/contacts.js";

import HttpError from "../../helpers/HttpError.js";

const contactsRouter = express.Router();

const addContactsSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.empty": `Missing field 'name'`,
		"any.required": `Missing required 'name' field`,
	}),
	email: Joi.string().email().required().messages({
		"string.empty": `Missing field 'email'`,
		"any.required": `Missing required 'email' field`,
	}),
	phone: Joi.string().required().messages({
		"string.empty": `Missing field 'phone'`,
		"any.required": `Missing required 'phone' field`,
	}),
});

contactsRouter.get("/", async (req, res) => {
	try {
		const allContacts = await contactsService.listContacts();
		res.json(allContacts);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

contactsRouter.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.post("/", async (req, res, next) => {
	try {
		const { error } = addContactsSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addContactsSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await contactsService.updateContactById(contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.removeContact(contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json({ message: "Contact Deleted" });
	} catch (error) {
		next(error);
	}
});

export default contactsRouter;
