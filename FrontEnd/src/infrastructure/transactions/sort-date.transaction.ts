import { Transaction } from "../index.js";

export const sortTransactionsByDate = ( userTransactions: [ Transaction ] ) => {

	const totalTransactions = userTransactions.length;

	for ( let i = 0; i < totalTransactions - 1; i++ ) {
		for ( let j = 0; j < totalTransactions - i - 1; j++ ) {
			if ( userTransactions[j].date < userTransactions[j + 1].date ) {
				const temp = userTransactions[j];
				userTransactions[j] = userTransactions[j + 1];
				userTransactions[j + 1] = temp;
			}
		}
	}

	return userTransactions;
}
