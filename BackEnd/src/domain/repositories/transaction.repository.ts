import { CreateTransactionDTO, PaginationDTO, TotalTransactions, UpdateTransactionDTO, TransactionEntity } from '..';

export abstract class TransactionRepository {

	abstract read ( userID: string, paginationDTO: PaginationDTO ): Promise< TransactionEntity[] >;
	abstract getTotalTransactionsByMethod( userID: string ): Promise< TotalTransactions >;
	abstract lastMonthTransactions( userID: string ): Promise< TransactionEntity[] >;
	abstract create ( createTransactionDTO: CreateTransactionDTO ): Promise< TransactionEntity >;
	abstract update ( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionEntity >;
	abstract delete ( transactionId: string ): Promise< TransactionEntity >;
}
