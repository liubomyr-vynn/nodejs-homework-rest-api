import path from "path";

import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, ...query } = req.query;
	const skip = (page - 1) * limit;
	const allContacts = await Contact.find(
		{ owner, ...query },
		"-createdAt -updatedAt",
		{
			skip,
			limit,
		},
	).populate("owner", "email");
	res.json(allContacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const avatarPath = path.resolve("public", "avatars");

const add = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Contact.create({ ...req.body, owner });
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndDelete(contactId);
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
	updateStatusContact: ctrlWrapper(updateStatusContact),
	deleteById: ctrlWrapper(deleteById),
};
