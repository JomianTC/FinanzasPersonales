export class HttpRequest {

	constructor() {}

	static async loginUser( email: string, password: string ) {
		
		return fetch( "http://localhost:8080/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})
		.then( response => {
			if ( !response.ok ) throw response.status;
			return response.json();
		})
		.then( data => { return data.user; })
		.catch( error => { throw error });
	}

	// static async registerUser( id: string ) {}
	
	static async getTransactions( id: string ) {

		return fetch( "http://localhost:8080/transaction", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: id })
		})
		.then( response => {
			if ( !response.ok ) throw response.status;
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	// async createTransaction( url: string ) {}
	// async updateTransaction( url: string ) {}
	// async deleteTransaction( url: string ) {}
}





