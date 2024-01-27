import { UserModel } from "../../data/mongo";
import { Request, Response } from "express"
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError, LoginUser, LoginUserDTO, RegisterUser, RegisterUserDTO } from "../../domain";

export class AuthController {

	constructor(
		private readonly authRepository: AuthRepository,
	){}

	private handleError = ( error: unknown, res: Response ) => {

		if ( error instanceof CustomError )
		return res.status( error.statusCode ).json({ error: error.message })

		console.log( error );
		return res.status( 500 ).json({ error: "Internal Server Error" });
	}

	loginUser = ( req: Request, res: Response ) => {

		const [ loginErrorDTO, loginUserDTO ] = LoginUserDTO.create( req.body );

		if ( loginErrorDTO ) return res.status( 400 ).json({ loginErrorDTO });

		new LoginUser( this.authRepository )
		.execute( loginUserDTO! )
		.then( data => res.json( data ) )
		.catch( error => this.handleError( error, res ) );
		
		return;
	}
	
	registerUser = ( req: Request, res: Response ) => {
		
		const [ registerErrorDTO, registerUserDTO ] = RegisterUserDTO.create( req.body );
		
		if ( registerErrorDTO ) return res.status( 400 ).json({ registerErrorDTO });

		new RegisterUser( this.authRepository )
		.execute( registerUserDTO! )
		.then( data => res.json( data ) )
		.catch( error => this.handleError( error, res ) );

		return;
	}

	getUser = ( _req: Request, res: Response ) => {
		
		UserModel.find()
		.then( user => {
			console.log( user );
			res.json( "Get Users" );
		})
		.catch( error => res.status( 500 ).json( error ) );
	}

	deleteUser = ( _req: Request, res: Response ) => {
		
		UserModel.deleteMany()
		.then( _user => res.json( "Delete Users" ) )
		.catch( error => res.status( 500 ).json( error ) );
	}
}

