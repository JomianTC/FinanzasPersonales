import { TransactionModel } from '../../data/mongo';
import {
	TransactionEntity,
	CreateTransactionDTO,
	UpdateTransactionDTO,
	CustomError,
	TransactionDatasource,
	PaginationDTO,
	TotalTransactions
} from '../../domain';
import { TransactionMapper } from '../';

export class TransactionDatasourceImpl implements TransactionDatasource {

	constructor(){}

	async read( userID: string, paginationDTO: PaginationDTO ): Promise< TransactionEntity[] > {
		
		try {

			const [ transactionsCash, transactionsCard ] = await Promise.all([
				await TransactionModel.find({ user: userID })
				.skip( ( paginationDTO.page - 1 ) * paginationDTO.limit )
				.limit( paginationDTO.limit )
				.sort({ date: -1 })
				.where( "method" ).equals( "CASH" ),
				await TransactionModel.find({ user: userID })
				.skip( ( paginationDTO.page - 1 ) * paginationDTO.limit )
				.limit( paginationDTO.limit )
				.sort({ date: -1 })
				.where( "method" ).equals( "CARD" )
			]);

			if ( !transactionsCash || !transactionsCard )
				throw CustomError.badRequest( "Transactions not found" );

			let userTransactions: TransactionEntity[] = [];
			
			transactionsCash.forEach( transaction => {
				userTransactions.push( TransactionMapper.transactionEntityFromObject( transaction ) ); 
			});

			transactionsCard.forEach( transaction => {
				userTransactions.push( TransactionMapper.transactionEntityFromObject( transaction ) ); 
			});
			
			return userTransactions;

		} catch (error) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async getTotalCashCardTransactions( userID: string ): Promise< TotalTransactions > {
		
		try {

			const [ totalCashTransactions, totalCardTransactions ] = await Promise.all([
				await TransactionModel.find({ user: userID })
				.countDocuments()
				.where( "method" ).equals( "CASH" ),
				await TransactionModel.find({ user: userID })
				.countDocuments()
				.where( "method" ).equals( "CARD" ),
			]);

			if ( totalCashTransactions === 0 || totalCardTransactions === 0 )
				throw CustomError.badRequest( "Transactions not found" );

			return {
				totalCashTransactions,
				totalCardTransactions
			};

		} catch (error) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async create( createTransactionDTO: CreateTransactionDTO ): Promise<TransactionEntity> {
		
		const transactionData = createTransactionDTO;

		try {

			const transaction = await TransactionModel.create( transactionData );
			if ( !transaction ) throw CustomError.badRequest( "Error creating transaction" );
			await transaction.save();

			return TransactionMapper.transactionEntityFromObject( transaction );

		} catch (error) {
			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async update( updateTransactionDTO: UpdateTransactionDTO ): Promise<TransactionEntity> {
		
		const { id, ...transactionData } = updateTransactionDTO;
		
		try {

			const updateTransaction = await TransactionModel.findById( id );
			if ( !updateTransaction ) throw CustomError.badRequest( "Transaction not found" );
			
			await TransactionModel.findByIdAndUpdate( id, transactionData );

			const newTransaction = await TransactionModel.findById( id );

			return TransactionMapper.transactionEntityFromObject( newTransaction! );
			
		} catch (error) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}

	async delete( transactionId: string ): Promise<TransactionEntity> {

		try {

			const deletedTransaction = await TransactionModel.findByIdAndDelete( transactionId );
			if ( !deletedTransaction ) throw CustomError.badRequest( "Transaction not found" );
			
			return TransactionMapper.transactionEntityFromObject( deletedTransaction );
		
		} catch (error) {
			
			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}
}
