import { Request, Response } from "express";
import { UpdateUserBalanceDTO, CustomError, UserRepository, UpdateBalance } from "../../domain";

export class UsersController {

	constructor(
		private readonly userRepository: UserRepository,
	){}

	private handleError = ( error: unknown, res: Response ) => {

		if ( error instanceof CustomError )
		return res.status( error.statusCode ).json({ error: error.message })

		console.log( error );
		return res.status( 500 ).json({ error: "Internal Server Error" });
	}

	updateBalance = ( req: Request, res: Response ) => {

		const [ errorUpdateBalance, updateUserBalanceDTO ] = UpdateUserBalanceDTO.create( req.body );
		if ( errorUpdateBalance ) return res.status( 400 ).json( errorUpdateBalance );

		new UpdateBalance( this.userRepository )
		.execute( updateUserBalanceDTO! )
		.then( data => res.json( data ) )
		.catch( error => this.handleError( error, res ) );		
		
		return;
	}
}
