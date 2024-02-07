import { TransactionEntity, CreateTransactionDTO, UpdateTransactionDTO, TransactionRepository, TransactionDatasource, PaginationDTO } from '../../domain';

export class TransactionRepositoryImpl implements TransactionRepository {

	constructor(
		private readonly transactionDatasource: TransactionDatasource,
	){}

	read( userID: string, paginationDTO: PaginationDTO ): Promise< TransactionEntity[] > {
		return this.transactionDatasource.read( userID, paginationDTO );
	}

	create( createTransactionDTO: CreateTransactionDTO ): Promise< TransactionEntity > {
		return this.transactionDatasource.create( createTransactionDTO );
	}

	update( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionEntity > {
		return this.transactionDatasource.update( updateTransactionDTO );
	}

	delete( transactionId: string ): Promise< TransactionEntity > {
		return this.transactionDatasource.delete( transactionId );
	}	
}
