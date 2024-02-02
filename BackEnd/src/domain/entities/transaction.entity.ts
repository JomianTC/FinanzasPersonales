
export class TransactionEntity {

	constructor(
		public id: string,
		public user: string,
		public method: string,
		public movement: string,
		public mount: number,
		public description: string,
		public date: Date		
	){}

	static get validMovements() {
		return [ "INCOME", "COST" ];
	}

	static get positiveMovements() {
		return [ "INCOME" ];
	}

	static get negativeMovements() {
		return [ "COST" ];
	}

	static get validMethods() {
		return [ "CASH", "CARD" ];
	}
}
