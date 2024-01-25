import { LoginUserDTO, RegisterUserDTO } from "..";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {

	abstract login( loginUserDTO: LoginUserDTO ): Promise< UserEntity >;
	abstract register( registerUserDTO: RegisterUserDTO ): Promise< UserEntity >;
}
