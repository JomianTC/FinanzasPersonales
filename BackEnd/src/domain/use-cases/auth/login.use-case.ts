import { LoginUserDTO, CustomError, AuthRepository } from '../../';
import { JwtAdapter } from '../../../config';

interface UserLog {
	token: string,
	user: {
		name: string,
		balance: number,
	}
}

interface LoginUserUseCase {
	execute( loginUserDTO: LoginUserDTO ): Promise< UserLog >
}

type SignToken = ( payload: Object, duration?: string ) => Promise< string | null >; 

export class LoginUser implements LoginUserUseCase {

	constructor(
		private readonly authRepository: AuthRepository,
		private readonly signToken: SignToken = JwtAdapter.generateToken,
	){}

	async execute( loginUserDto: LoginUserDTO ): Promise< UserLog > {

		const user = await this.authRepository.login( loginUserDto );

		const token = await this.signToken({ id: user.id, name: user.name, balance: user.balance, }, "3h" );
		if( !token ) throw CustomError.internalServer( "Error Generating Token" );

		return {
			token,
			user: {
				name: user.name,
				balance: user.balance,
			}
		}
	}
}
