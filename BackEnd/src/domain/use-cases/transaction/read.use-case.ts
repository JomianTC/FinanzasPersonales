import { TransactionRepository } from '../../repositories/transaction.repository';
import { PaginationDTO } from '../../dto/pagination.dto';

interface transaction {
	id: string,
	user: string, 
	movement: string, 
	mount: number, 
	description: string, 
	date: Date, 
}

type TransactionsUserId = transaction[];

interface ReadTransactionUseCase {
	execute( transactionId: string, paginationDTO: PaginationDTO ): Promise< TransactionsUserId >;
}

export class ReadTransaction implements ReadTransactionUseCase{

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( transactionId: string, paginationDTO: PaginationDTO ): Promise<TransactionsUserId> {

		const transactions = await this.transactionRepository.read( transactionId, paginationDTO );
		return transactions;
	}
}
