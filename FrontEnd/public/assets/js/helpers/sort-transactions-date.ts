export const transactionBubbleSortDate = ( userTransactions: [ any ] ) => {

	const n = userTransactions.length;

	for ( let i = 0; i < n - 1; i++ ) {
		for ( let j = 0; j < n - i - 1; j++ ) {
			if ( userTransactions[j].date < userTransactions[j + 1].date ) {
				const temp = userTransactions[j];
				userTransactions[j] = userTransactions[j + 1];
				userTransactions[j + 1] = temp;
			}
		}
	}

	return userTransactions;
}
