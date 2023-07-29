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
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		token: String,
	},
	{ versionKey: false },
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
