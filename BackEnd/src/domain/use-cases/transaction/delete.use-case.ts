import { TransactionRepository } from '../../repositories/transaction.repository';

interface TransactionDelete {
	user: string, 
	movement: string, 
	mount: number, 
	description: string, 
	date: Date, 
}

interface DeleteTransactionUseCase {
	execute( transactionID: string ): Promise< TransactionDelete >
}

export class DeleteTransaction implements DeleteTransactionUseCase {
	
	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( transactionID: string ): Promise< TransactionDelete > {

		const transaction = await this.transactionRepository.delete( transactionID );

		return {
			user: transaction.user,
			movement: transaction.movement,
			mount: transaction.mount,
			description: transaction.description,
			date: transaction.date,
		}
	}
}
