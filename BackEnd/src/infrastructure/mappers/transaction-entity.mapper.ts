import { CustomError, TransactionEntity } from "../../domain";

export class TransactionMapper {

	static transactionEntityFromObject( object: {[ key: string]: any } ){

		const { _id, id, user, method, movement, mount, description, date } = object;

		if ( !_id || !id ) throw CustomError.badRequest( "Missing Id" );
		if ( !user ) throw CustomError.badRequest( "Missing User" );
		if ( !method ) throw CustomError.badRequest( "Missing Method" );
		if ( !movement ) throw CustomError.badRequest( "Missing Movement" );
		if ( !mount ) throw CustomError.badRequest( "Missing Mount" );
		if ( !description ) throw CustomError.badRequest( "Missing Description" );
		if ( !date ) throw CustomError.badRequest( "Missing Date" );
	
		return new TransactionEntity( _id || id, user, method, movement, mount, description, date );
	}
}

