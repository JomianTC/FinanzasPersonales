import { TransactionEntity } from "../entities/transaction.entity";

export class CreateTransactionDTO {

	constructor(
		public user: string,
		public movement: string,
		public mount: number,
		public description: string,
		public date: Date,
	){}

	static create ( object: {[ key: string ]: any} ): [ string?, CreateTransactionDTO? ]{

		const { user, movement, mount, description = " ", date = new Date() } = object;

		const validMovements = TransactionEntity.validMovements;

		if ( !user ) return [ "User is required" ];
		if ( !validMovements.includes( movement ) ) return [ "Movement not valid" ];
		if ( !mount ) return [ "Mount is required" ];
		if ( !(date instanceof Date) )
			return [ undefined, new CreateTransactionDTO( user, movement, mount, description, new Date( date ) ) ];
		
		return [ undefined, new CreateTransactionDTO( user, movement, mount, description, date ) ];
	}	
}
