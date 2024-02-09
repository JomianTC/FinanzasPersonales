import { TransactionRepository } from '../../repositories/transaction.repository';

interface TotalUserExpenses { totalExpenses: number; }

interface ReadLastMonthTransactionUseCase {
	execute( transactionId: string ): Promise< TotalUserExpenses >;
}

export class ReadLastMonthTransaction implements ReadLastMonthTransactionUseCase{

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( transactionId: string ): Promise< TotalUserExpenses > {

		const transactions = await this.transactionRepository.lastMonthTransactions( transactionId );

		let totalExpenses: number = 0;
		transactions.forEach( transaction => { totalExpenses += transaction.mount; });
			
		return { totalExpenses };
	}
}
