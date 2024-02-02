import { AuthRepository } from '../../repositories/auth.repository';
import { RegisterUserDTO } from '../../dto/register-user.dto';

interface UserReg {
	id: string,
	name: string,
	email: string,
}

interface RegisterUserUseCase {
	execute( registerUserDTO: RegisterUserDTO ): Promise< UserReg >
}

export class RegisterUser implements RegisterUserUseCase {

	constructor(
		private readonly authRepository: AuthRepository,
	){}

	async execute( registerUserDTO: RegisterUserDTO ): Promise< UserReg > {

		const user = await this.authRepository.register( registerUserDTO );

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		}
	}
}