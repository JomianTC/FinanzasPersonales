import { TransactionModel } from '../../data/mongo';
import { TransactionEntity, CreateTransactionDTO, UpdateTransactionDTO, CustomError, TransactionDatasource } from '../../domain';
import { TransactionMapper } from '../mappers/transaction-entity.mapper';

export class TransactionDatasourceImpl implements TransactionDatasource {

	constructor(){}

	async read( userID: string ): Promise<TransactionEntity[]> {
		
		try {

			const transactions = await TransactionModel.find({ user: userID });
			if ( !transactions ) throw CustomError.badRequest( "Transactions not found" );

			let userTransactions: TransactionEntity[] = [];
			
			transactions.forEach( transaction => {
				userTransactions.push( TransactionMapper.transactionEntityFromObject( transaction ) ); 
			});
			
			return userTransactions;

		} catch (error) {
			console.log( error );
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async create( createTransactionDTO: CreateTransactionDTO ): Promise<TransactionEntity> {
		
		const { user, movement, mount, description, date } = createTransactionDTO;

		try {

			const transaction = await TransactionModel.create({ user, movement, mount, description, date });
			if ( !transaction ) throw CustomError.internalServer( "Error creating transaction" );
			await transaction.save();

			return TransactionMapper.transactionEntityFromObject( transaction );

		} catch (error) {
			console.log( error );
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async update( updateTransactionDTO: UpdateTransactionDTO ): Promise<TransactionEntity> {
		
		const { id, movement, mount, description, date } = updateTransactionDTO;
		
		try {

			const updateTransaction = await TransactionModel.findById( id );
			if ( !updateTransaction ) throw CustomError.notFound( "Transaction not found" );
			
			await TransactionModel.findByIdAndUpdate( id, { movement, mount, description, date });

			const newTransaction = await TransactionModel.findById( id );

			return TransactionMapper.transactionEntityFromObject( newTransaction! );
			
		} catch (error) {
			console.log( error );
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async delete( transactionId: string ): Promise<TransactionEntity> {

		try {

			const deletedTransaction = await TransactionModel.findByIdAndDelete( transactionId );
			if ( !deletedTransaction ) throw CustomError.notFound( "Transaction not found" );
			
			return TransactionMapper.transactionEntityFromObject( deletedTransaction );
		
		} catch (error) {
			console.log( error );
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}
}
