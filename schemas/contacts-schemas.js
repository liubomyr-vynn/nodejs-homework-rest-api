import Joi from "joi";

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

export default {
	addContactsSchema,
};
