import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";

export class JWTMiddleware {

	static validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {
		
		const token = req.header( "Authorization" );
		if ( !token ) return res.status( 401 ).json( "No Token Provided" );

		try {
		
			const payload = await JwtAdapter.validateToken<{ id: string }>( token );
			if ( !payload ) return res.status( 401 ).json( "Invalid Token" );

			const user = await UserModel.findById( payload.id );
			if ( !user ) return res.status( 400 ).json( "Invalid Token - user not found" );

			req.body.user = payload.id;

			next();

		} catch ( error ) {
			
			console.log( error );
			res.status( 500 ).json( "Internal Server Error" );
		}

		return;
	}
}
