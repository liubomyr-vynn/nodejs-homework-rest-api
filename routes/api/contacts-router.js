import express from "express";

import contacts from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	// res.json({ message: "template message" });

	const allContacts = await contacts.listContacts();
	res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
	// res.json({ message: "template message" });

	const id = req.params.contactId;
	const oneContact = await contacts.getContactById(id);
	res.json(oneContact);
});

router.post("/", async (req, res, next) => {
	const contactData = req.body;
	const add = await contacts.addContact(contactData);
	res.json(add);
	// console.log(contactData);
	// res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

export default router;
