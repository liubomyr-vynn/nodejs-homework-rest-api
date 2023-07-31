import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const addContactsSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.empty": `Missing field 'name'`,
		"any.required": `Missing required 'name' field`,
	}),
	email: Joi.string().pattern(emailRegexp).required().messages({
		"string.empty": `Missing field 'email'`,
		"any.required": `Missing required 'email' field`,
	}),
	phone: Joi.string().required().messages({
		"string.empty": `Missing field 'phone'`,
		"any.required": `Missing required 'phone' field`,
	}),
	favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"string.empty": `Missing field favorite`,
		"any.required": `Missing field favorite`,
	}),
});

export default {
	addContactsSchema,
	contactUpdateFavoriteSchema,
};
