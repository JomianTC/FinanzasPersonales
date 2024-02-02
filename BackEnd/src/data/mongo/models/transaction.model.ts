import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
	
	user: {
		type: String,
	},
	method: {
		type: String,
		required: true,
		enum: [ "CASH", "CARD" ],
	},
	movement: {
		type: String,
		required: true,
		enum: [ "INCOME", "COST" ],
	},
	mount: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	date: {
		type: Date,
		default: new Date(),
	}
});

export const TransactionModel = mongoose.model( "Transaction", transactionSchema );
