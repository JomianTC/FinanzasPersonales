import { TransactionEntity } from "../entities/transaction.entity";

export class CreateTransactionDTO {

	constructor(
		public user: string,
		public method: string,
		public movement: string,
		public mount: number,
		public description: string,
		public date: Date,
	){}

	static create ( object: {[ key: string ]: any} ): [ string?, CreateTransactionDTO? ]{

		const { user, method, movement, mount, description = " ", date = new Date() } = object;

		const validMovements = TransactionEntity.validMovements;
		const validMethods = TransactionEntity.validMethods;

		if ( !user ) return [ "User is required" ];
		if ( !validMovements.includes( movement ) ) return [ "Movement not valid" ];
		if ( !validMethods.includes( method ) ) return [ "Method not valid" ];
		if ( !mount ) return [ "Mount is required" ];
		if ( !(date instanceof Date) )
			return [ undefined, new CreateTransactionDTO( user, method, movement, mount, description, new Date( date ) ) ];
		
		return [ undefined, new CreateTransactionDTO( user, method, movement, mount, description, date ) ];
	}	
}
