import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (_, res) => {
	const allContacts = await contactsService.listContacts();
	res.json(allContacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.getContactById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const add = async (req, res) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.updateContactById(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.status(200).json({ message: "Contact Deleted" });
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById),
};
