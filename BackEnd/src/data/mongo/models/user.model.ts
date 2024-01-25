import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

	name: {
		type: String,
		required: [ true, "Name is required" ]
	},
	email: {
		type: String,
		required: [ true, "Email is required" ],
		unique: true
	},
	password: {
		type: String,
		required: [ true, "Password is required" ]
	},
	balance: {
		type: Number,
		default: 0
	},
});

export const UserModel = mongoose.model( "User", userSchema );
