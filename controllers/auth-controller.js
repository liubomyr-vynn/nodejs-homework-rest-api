import path from "path";
import fs from "fs/promises";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";

import User from "../models/user.js";

import { HttpError, sendEmail } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const verificationToken = nanoid();

	const avatarURL = gravatar.url(
		email,
		{
			s: "100",
			r: "g",
			d: "mp",
		},
		true,
	);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

const verify = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });
	if (!user) {
		throw HttpError(404, "User not found");
	}

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: "",
	});

	res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(404, "User not found");
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a href="${BASE_URL}/users/verify/${user.verificationToken}" target="_blank">Click to verify email</a>`,
	};
	await sendEmail(verifyEmail);

	res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is incorrect");
	}

	if (!user.verify) {
		throw HttpError(404, "User not found");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password is incorrect");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = (req, res) => {
	const { email, subscription } = req.user;
	res.json({
		email,
		subscription,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json();
};

const avatarPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
	if (!req.file) {
		throw HttpError(400, "Avatar is required");
	}
	const { _id } = req.user;
	const { path: oldPath, filename } = req.file;

	await Jimp.read(oldPath)
		.then(image => {
			return image.resize(250, 250).write(oldPath);
		})
		.catch(err => {
			throw err;
		});

	const newPath = path.join(avatarPath, filename);
	await fs.rename(oldPath, newPath);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.status(200).json({ avatarURL });
};

export default {
	register: ctrlWrapper(register),
	verify: ctrlWrapper(verify),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updateAvatar: ctrlWrapper(updateAvatar),
};
