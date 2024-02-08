import { CreateTransactionDTO, PaginationDTO, TotalTransactions, UpdateTransactionDTO, TransactionEntity } from '..';

export abstract class TransactionDatasource {

	abstract read ( userID: string, paginationDTO: PaginationDTO ): Promise< TransactionEntity[] >;
	abstract getTotalCashCardTransactions( userID: string ): Promise< TotalTransactions >;
	abstract create ( createTransactionDTO: CreateTransactionDTO ): Promise< TransactionEntity >;
	abstract update ( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionEntity >;
	abstract delete ( transactionId: string ): Promise< TransactionEntity >;
}
