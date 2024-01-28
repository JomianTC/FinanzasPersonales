import { CustomError, UserEntity } from "../../domain";

export class UserMapper {

	static userEntityFromObject( object: { [ key: string ]: any }){

		const { id, _id, name, email, password, balance } = object;

		if ( !_id || !id ) throw CustomError.badRequest( "Missing ID" );
		if ( !name ) throw CustomError.badRequest( "Missing name" );
		if ( !email ) throw CustomError.badRequest( "Missing email" );
		if ( !password ) throw CustomError.badRequest( "Missing password" );
		if ( balance === undefined ) throw CustomError.badRequest( "Missing balance" );

		return new UserEntity( _id || id, name, email, password, balance );
	}
}

