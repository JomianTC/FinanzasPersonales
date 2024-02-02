
export class UpdateTransactionDTO {

	constructor(
		public id: string,
		public method: string,
		public movement: string,
		public mount: number,
		public description: string,
		public date: Date,
	){}

	static create ( object: {[ key: string ]: any} ): [ string?, UpdateTransactionDTO? ]{

		const { id, method, movement, mount, description, date } = object;

		if ( !id ) return [ "Transaction Id is required" ];

		return [ undefined, new UpdateTransactionDTO( id, method, movement, mount, description, date ) ];
	}	
}
