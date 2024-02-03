import { LoginUserDTO } from '../../dto/login-user.dto';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserLog {
	id: string,
	name: string,
	balance: number,
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
			id: user.id,
			name: user.name,
			balance: user.balance,
		}
	}
}