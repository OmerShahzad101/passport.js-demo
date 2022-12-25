const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

  

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, default: ""},
		lastName: { type: String, default: "" },
		email: { type: String },
		phone: { type: String },
		accessToken: { type: String },
		refreshToken: { type: String },
		password: { type: String, required: true },
		
	},
	{ timestamps: true }
);



/**
 * @typedef User
 */

module.exports = mongoose.model("users", UserSchema);
