import { Request, Response } from "express";
import { 
	CreateTransaction, 
	CreateTransactionDTO, 
	CustomError, 
	DeleteTransaction, 
	PaginationDTO, 
	ReadTransaction, 
	TransactionRepository, 
	UpdateTransaction, 
	UpdateTransactionDTO
} from "../../domain";

export class TransactionsController {

	constructor(
		private readonly transactionRepository: TransactionRepository,
	){}

	private handleError = ( error: unknown, res: Response ) => {

		if ( error instanceof CustomError )
			return res.status( error.statusCode ).json( error.message );

		console.log( error );
		return res.status( 500 ).json({ error: "Internal Server Error" });
	}

	getTransactions = ( req: Request, res: Response ) => {

		const userId = req.body.user;

		const [ paginationError, paginationDTO ] = PaginationDTO.create( req.query );
		if ( paginationError ) return res.status( 400 ).json( paginationError );

		new ReadTransaction( this.transactionRepository )
		.execute( userId, paginationDTO! )
		.then( data => res.json( data ) )
		.catch( error => this.handleError( error, res ) );

		return;
	}

	createTransaction = ( req: Request, res: Response ) => {

		const [ createTransactionError, createTransactionDTO ] = CreateTransactionDTO.create( req.body );
		if ( createTransactionError ) return res.status( 400 ).json( createTransactionError );

		new CreateTransaction( this.transactionRepository )
		.execute( createTransactionDTO! )
		.then( _data => res.json( "OK" ) )
		.catch( error => this.handleError( error, res ) );

		return;
	}

	updateTransactions = ( req: Request, res: Response ) => {

		const [ updateTransactionError, updateTransactionDTO ] = UpdateTransactionDTO.create( req.body );
		if ( updateTransactionError ) return res.status( 400 ).json( updateTransactionError );

		new UpdateTransaction( this.transactionRepository )
		.execute( updateTransactionDTO! )
		.then( _data => res.json( "OK" ) )
		.catch( error => this.handleError( error, res ) );

		return;
	}

	deleteTransaction = ( req: Request, res: Response ) => {

		const transactionId = req.body.id;
		
		new DeleteTransaction( this.transactionRepository )
		.execute( transactionId )
		.then( _data => res.json( "OK" ) )
		.catch( error => this.handleError( error, res ) );
	}
}
