
export class UpdateTransactionDTO {

	constructor(
		public id: string,
		public movement: string,
		public mount: number,
		public description: string,
		public date: Date,
	){}

	static create ( object: {[ key: string ]: any} ): [ string?, UpdateTransactionDTO? ]{

		const { id, movement, mount, description, date } = object;

		if ( !id ) return [ "Transaction Id is required" ];

		return [ undefined, new UpdateTransactionDTO( id, movement, mount, description, date ) ];
	}	
}
