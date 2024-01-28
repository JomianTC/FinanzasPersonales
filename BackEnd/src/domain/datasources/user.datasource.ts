import { UpdateUserBalanceDTO, UserEntity } from "..";

export abstract class UserDatasource {
	abstract updateBalance( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise< UserEntity >
}
