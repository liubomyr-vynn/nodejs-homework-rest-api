import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userRegisterSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		"string.empty": `Missing field 'email'`,
		"any.required": `Missing required 'email' field`,
	}),
	password: Joi.string().min(6).required().messages({
		"string.empty": `Missing field 'password'`,
		"any.required": `Missing required 'password' field`,
	}),
});

const userLoginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		"string.empty": `Missing field 'email'`,
		"any.required": `Missing required 'email' field`,
	}),
	password: Joi.string().min(6).required().messages({
		"string.empty": `Missing field 'password'`,
		"any.required": `Missing required 'password' field`,
	}),
});

export default {
	userRegisterSchema,
	userLoginSchema,
};
