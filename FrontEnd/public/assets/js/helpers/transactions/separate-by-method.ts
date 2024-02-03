import { Transaction } from '..';

export const getTransactionsByCash = ( userTransactions: [ Transaction ] ) => {

	const transactionsByCash = userTransactions.filter( transaction => {
		if ( transaction.method === "CASH" ) return transaction;
	});

	return transactionsByCash;
}

export const getTransactionsByCard = ( userTransactions: [ Transaction ] ) => {

	const transactionsByCard = userTransactions.filter( transaction => {
		if ( transaction.method === "CARD" ) return transaction;
	});

	return transactionsByCard;
}