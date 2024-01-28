import { UpdateUserBalanceDTO, UserEntity } from "..";

export abstract class UserRepository {
	abstract updateBalance( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise< UserEntity >
}
