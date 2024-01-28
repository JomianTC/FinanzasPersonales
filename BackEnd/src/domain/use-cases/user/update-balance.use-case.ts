import { UserRepository } from '../../repositories/user.repository';
import { UpdateUserBalanceDTO } from '../../dto/update-user-balance.dto';

interface UserBalance {
	id: string, 
	name: string, 
	balance: number, 
}

interface UpdateUserBalanceUseCase {
	execute( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise< UserBalance >;
}

export class UpdateBalance implements UpdateUserBalanceUseCase {
	
	constructor(
		private readonly userRepository: UserRepository,
	){}
	
	async execute( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise<UserBalance> {
		
		const user = await this.userRepository.updateBalance( updateUserBalanceDTO );

		return {
			id: user.id,
			name: user.name,
			balance: user.balance,
		}
	}
}
