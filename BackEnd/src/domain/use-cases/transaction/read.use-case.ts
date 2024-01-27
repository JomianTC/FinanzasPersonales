import { TransactionRepository } from '../../repositories/transaction.repository';

interface transaction {
	id: string,
	user: string, 
	movement: string, 
	mount: number, 
	description: string, 
	date: Date, 
}

type TransactionsUserId = transaction[]

interface ReadTransactionUseCase {
	execute( transactionId: string ): Promise< TransactionsUserId >;
}

export class ReadTransaction implements ReadTransactionUseCase{

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute(transactionId: string): Promise<TransactionsUserId> {

		const userTransactions = await this.transactionRepository.read( transactionId );
		return userTransactions;
	}
}
