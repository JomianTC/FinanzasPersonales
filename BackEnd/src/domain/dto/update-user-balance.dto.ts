import { TransactionEntity } from "../entities/transaction.entity";

export class UpdateUserBalanceDTO {

	constructor(
		public userId: string,
		public movement: string,
		public mount: string,
	){}

	static create( object: { [ keys: string ]: any }): [ string?, UpdateUserBalanceDTO? ] {

		const { userId, movement, mount } = object;
			
		const validMovements = TransactionEntity.validMovements;

		if ( !userId ) return [ "Missing User ID" ];
		if ( !movement ) return [ "Missing Movement" ];
		if ( !validMovements.includes( movement ) ) return [ "Missing Movement" ];
		if ( !mount ) return [ "Missing Mount" ];

		return [ undefined, new UpdateUserBalanceDTO( userId, movement, mount ) ];
	}
}
