export class PaginationDTO {

	constructor(
		public page: number,
		public limit: number,
	){}

	static create( object: { [ key: string ] : any } ): [ string?, PaginationDTO? ]{

		const { page = 1, limit = 10 } = object;

		if ( !page ) return [ "Missing page" ];
		if ( !limit ) return [ "Missing limit" ];

		if ( +page < 0 ) return [ "Page must be greater than 0" ];
		if ( +limit < 0 ) return [ "limit must be greater than 0" ];

		return [ undefined, new PaginationDTO( +page, +limit ) ];
	}
}
