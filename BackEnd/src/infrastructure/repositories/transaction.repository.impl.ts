import { TransactionEntity, CreateTransactionDTO, UpdateTransactionDTO, TransactionRepository, TransactionDatasource } from '../../domain';

export class TransactionRepositoryImpl implements TransactionRepository {

	constructor(
		private readonly transactionDatasource: TransactionDatasource,
	){}

	read( userID: string ): Promise< TransactionEntity[] > {
		return this.transactionDatasource.read( userID );
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
