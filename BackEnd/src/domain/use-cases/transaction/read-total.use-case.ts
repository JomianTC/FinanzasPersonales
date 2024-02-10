import { TransactionRepository } from '../../repositories/transaction.repository';

type TotalTransactions = {
	totalCashTransactions: number,
	totalCardTransactions: number,
};

interface ReadTransactionUseCase {
	execute( userID: string ): Promise< TotalTransactions >;
}

export class ReadTotalTransaction implements ReadTransactionUseCase{

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( userID: string ): Promise< TotalTransactions > {

		const totalTransactions = await this.transactionRepository.getTotalTransactionsByMethod( userID );
		return { ...totalTransactions };
	}
}
