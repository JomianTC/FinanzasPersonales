import { CreateTransactionDTO, UpdateTransactionDTO } from '..';
import { TransactionEntity } from '../entities/transaction.entity';

export abstract class TransactionRepository {

	abstract read ( userID: string ): Promise< TransactionEntity[] >;
	abstract create ( createTransactionDTO: CreateTransactionDTO ): Promise< TransactionEntity >;
	abstract update ( updateTransactionDTO: UpdateTransactionDTO ): Promise< TransactionEntity >;
	abstract delete ( transactionId: string ): Promise< TransactionEntity >;
}
