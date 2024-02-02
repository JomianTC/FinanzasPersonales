import { UserModel } from "../../data/mongo";
import { CustomError, TransactionEntity, UpdateUserBalanceDTO, UserDatasource, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user-entity.mapper";

export class UserDatasourceImpl implements UserDatasource {

	async updateBalance( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise<UserEntity> {

		const { userId, movement, mount } = updateUserBalanceDTO;

		try {

			let user = await UserModel.findById( userId );
			if ( !user ) throw CustomError.badRequest( "User dont exist" );
		
			if ( TransactionEntity.positiveMovements.includes( movement ) )
				user = await UserModel.findByIdAndUpdate( 
					userId, 
					{ balance: user.balance + Number( mount ) }, 
					{ new: true }
				);
				
			else if ( TransactionEntity.negativeMovements.includes( movement ) )
				user = await UserModel.findByIdAndUpdate( 
					userId, 
					{ balance: user.balance - Number( mount ) }, 
					{ new: true }
				);
			
			return UserMapper.userEntityFromObject( user! );

		} catch ( error ) {
			
			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}
}
