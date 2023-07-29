import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({
		"string.empty": `Missing field 'email'`,
		"any.required": `Missing required 'email' field`,
	}),
	password: Joi.string().min(6).required(),
});

export default {
	userSignupSchema,
};
