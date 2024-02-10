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

type Transactions = transaction[];

interface ReadTransactionUseCase {
	execute( userID: string, paginationDTO: PaginationDTO ): Promise< Transactions >;
}

export class ReadTransaction implements ReadTransactionUseCase{

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( userID: string, paginationDTO: PaginationDTO ): Promise< Transactions > {

		const transactions = await this.transactionRepository.read( userID, paginationDTO );
		return transactions;
	}
}
