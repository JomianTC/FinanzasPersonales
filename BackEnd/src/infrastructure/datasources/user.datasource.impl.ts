import { UserModel } from "../../data/mongo";
import { CustomError, TransactionEntity, UpdateUserBalanceDTO, UserDatasource, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user-entity.mapper";

export class UserDatasourceImpl implements UserDatasource {

	async updateBalance( updateUserBalanceDTO: UpdateUserBalanceDTO ): Promise<UserEntity> {

		const { user, movement, mount } = updateUserBalanceDTO;

		try {

			let userFound = await UserModel.findById( user );
			if ( !userFound ) throw CustomError.badRequest( "User dont exist" );
		
			if ( TransactionEntity.positiveMovements.includes( movement ) )
				userFound = await UserModel.findByIdAndUpdate( 
					user, 
					{ balance: userFound.balance + Number( mount ) }, 
					{ new: true }
				);
				
			else if ( TransactionEntity.negativeMovements.includes( movement ) )
				userFound = await UserModel.findByIdAndUpdate( 
					user, 
					{ balance: userFound.balance - Number( mount ) }, 
					{ new: true }
				);
			
			return UserMapper.userEntityFromObject( userFound! );

		} catch ( error ) {
			
			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer( "Internal Server Error" );
		}
	}
}
