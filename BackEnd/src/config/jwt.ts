import jwt from "jsonwebtoken";
import { envs } from './';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

	static async generateToken( paylaod: Object, duration: string = "36h" ): Promise<string|null> {

		return new Promise( ( resolve ) => {
			jwt.sign( paylaod, JWT_SEED, { expiresIn: duration }, ( err, token ) => {

				if ( err ) return resolve( null );
				return resolve( token! );
			});
		});
	}

	static validateToken<T>( token: string ): Promise<T | null> {

		return new Promise( ( resolve ) => {
			jwt.verify( token, JWT_SEED, ( err, decoded ) => {
				if ( err ) return resolve( null );
				resolve( decoded as T );
			});
		});
	}
}