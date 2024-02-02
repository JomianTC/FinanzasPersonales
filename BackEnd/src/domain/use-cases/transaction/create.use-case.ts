import { CreateTransactionDTO } from "../.."
import { TransactionRepository } from '../../repositories/transaction.repository';

interface TransactionCreate {
	user: string, 
	method: string, 
	movement: string, 
	mount: number, 
	description: string, 
	date: Date, 
}

interface CreateTransactionUseCase {
	execute( createTransactionDTO: CreateTransactionDTO ): Promise< TransactionCreate >
}

export class CreateTransaction implements CreateTransactionUseCase {
	
	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	async execute( createTransactionDTO: CreateTransactionDTO ): Promise<TransactionCreate> {

		const transaction = await this.transactionRepository.create( createTransactionDTO );
		return { ...transaction }
	}
}
