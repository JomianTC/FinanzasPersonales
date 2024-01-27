import { TransactionRepository } from '../../repositories/transaction.repository';
import { UpdateTransactionDTO } from '../../dto/update-transaction.dto';

interface TransactionUpdate {
	user: string, 
	movement: string, 
	mount: number, 
	description: string, 
	date: Date, 
}

interface UpdateTransactionUseCase {
	execute( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionUpdate >
}

export class UpdateTransaction implements UpdateTransactionUseCase {
	
	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionUpdate > {

		const transaction = await this.transactionRepository.update( updateTransactionDTO );

		return {
			user: transaction.user,
			movement: transaction.movement,
			mount: transaction.mount,
			description: transaction.description,
			date: transaction.date,
		}
	}
}
