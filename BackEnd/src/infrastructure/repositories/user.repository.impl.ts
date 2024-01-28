import { UpdateUserBalanceDTO, UserEntity, UserRepository, UserDatasource } from "../../domain";

export class UserRepositoryImpl implements UserRepository {

	constructor(
		private readonly userDatasource: UserDatasource,
	){}

	updateBalance( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise<UserEntity> {
		return this.userDatasource.updateBalance( updateUserBalanceDTO );
	}
}
