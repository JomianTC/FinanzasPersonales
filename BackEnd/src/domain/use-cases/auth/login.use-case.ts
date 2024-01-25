import { LoginUserDTO } from '../../dto/login-user.dto';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserLog {
	user: {
		id: string,
		name: string,
		email: string,
	}
}

interface LoginUserUseCase {
	execute( loginUserDTO: LoginUserDTO ): Promise< UserLog >
}

export class LoginUser implements LoginUserUseCase {

	constructor(
		private readonly authRepository: AuthRepository,
	){}

	async execute( loginUserDto: LoginUserDTO ): Promise< UserLog > {

		const user = await this.authRepository.login( loginUserDto );

		return {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			}
		}
	}
}