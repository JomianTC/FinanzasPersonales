import { 
	TransactionEntity,
	CreateTransactionDTO,
	UpdateTransactionDTO,
	TransactionRepository,
	TransactionDatasource,
	PaginationDTO,
	TotalTransactions
} from '../../domain';

export class TransactionRepositoryImpl implements TransactionRepository {

	constructor(
		private readonly transactionDatasource: TransactionDatasource,
	){}

	read( userID: string, paginationDTO: PaginationDTO ): Promise< TransactionEntity[] > {
		return this.transactionDatasource.read( userID, paginationDTO );
	}
	
	getTotalTransactionsByMethod( userID: string ): Promise<TotalTransactions> {
		return this.transactionDatasource.getTotalTransactionsByMethod( userID );
	}

	lastMonthTransactions( userID: string ): Promise< TransactionEntity[] > {
		return this.transactionDatasource.lastMonthTransactions( userID );
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
