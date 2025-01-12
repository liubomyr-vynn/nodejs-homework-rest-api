import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, "Email is required"],
			unique: true,
		},
		avatarURL: {
			type: String,
			required: [true, "Avatar is required"],
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
	},
	{ versionKey: false },
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
