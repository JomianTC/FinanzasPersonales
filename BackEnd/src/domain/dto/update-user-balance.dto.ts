import { TransactionEntity } from "../entities/transaction.entity";

export class UpdateUserBalanceDTO {

	constructor(
		public user: string,
		public movement: string,
		public mount: string,
	){}

	static create( object: { [ keys: string ]: any }): [ string?, UpdateUserBalanceDTO? ] {

		const { user, movement, mount } = object;
			
		const validMovements = TransactionEntity.validMovements;

		if ( !user ) return [ "Missing User ID" ];
		if ( !movement ) return [ "Missing Movement" ];
		if ( !validMovements.includes( movement ) ) return [ "Missing Movement" ];
		if ( !mount ) return [ "Missing Mount" ];

		return [ undefined, new UpdateUserBalanceDTO( user, movement, mount ) ];
	}
}
