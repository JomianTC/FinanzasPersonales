import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { AuthDatasource, CustomError, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user-entity.mapper";

type HashFunction = ( password: string ) => string;
type CompareHashFunction = ( password: string, hashed: string ) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

	constructor(
		private readonly hashPassword: HashFunction = BcryptAdapter.hash,
		private readonly comparePassword: CompareHashFunction = BcryptAdapter.compare,
	){}


	async login( loginUserDTO: LoginUserDTO ): Promise< UserEntity > {

		const { email, password } = loginUserDTO;

		try {

			const user = await UserModel.findOne({ email });
			if ( !user ) throw CustomError.badRequest( "User does not exist" );

			const passwordIsCorrect = this.comparePassword( password, user.password );
			if ( !passwordIsCorrect )
				throw CustomError.badRequest( "Password incorrect" );

			return UserMapper.userEntityFromObject( user );

		} catch ( error ) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer();
		
		}		
	}
	
	async register( registerUserDTO: RegisterUserDTO ): Promise< UserEntity > {

		const { name, email, password } = registerUserDTO;

		try {

			const userExists = await UserModel.findOne({ email });
			if ( userExists ) throw CustomError.badRequest( "Email already exits" );

			const user = await UserModel.create({ name, email, password: this.hashPassword( password ) });
			if ( !user ) throw CustomError.internalServer( "Error creating user" );

			await user.save();

			return UserMapper.userEntityFromObject( user );

		} catch ( error ) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer();
		
		}
	}
}
