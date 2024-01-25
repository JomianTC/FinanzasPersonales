import { AuthDatasource, AuthRepository, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

	constructor(
		private readonly authDatasource: AuthDatasource,
	){}

	login( loginUserDTO: LoginUserDTO ): Promise< UserEntity > {
		return this.authDatasource.login( loginUserDTO );
	}
	register( registerUserDTO: RegisterUserDTO ): Promise< UserEntity > {
		return this.authDatasource.register( registerUserDTO );
	}
}
