type CreateTransaction = {
	user: String;
	movement: String;
	mount: Number;
	description: String;
	date: string;
}

type UpdateTransaction = {
	id: string;
	movement: string;
	mount: Number;
	description: string;
	date: string;
}

type UserBalance = {
	userId: String;
	movement: String;
	mount: Number;
}

type RegisterUser = {
	name: string;
	email: string;
	password: string;
}

export class HttpRequest {

	constructor() {}

	static async loginUser( email: string, password: string ) {
		
		return fetch( "http://localhost:8080/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	static async registerUser( registerUser: RegisterUser ) {

		return await fetch( "http://localhost:8080/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( registerUser )
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}
	
	static async getTransactions( id: string ) {

		return fetch( "http://localhost:8080/transaction", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: id })
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	static async createTransaction( createTransaction: CreateTransaction ) {

		return fetch( "http://localhost:8080/transaction/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( createTransaction )
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	static async updateTransaction( updateTransaction: UpdateTransaction ) {

		return fetch( "http://localhost:8080/transaction/update", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( updateTransaction )
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	static async deleteTransaction( transactionID: string ) {

		return fetch( "http://localhost:8080/transaction/delete", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: transactionID })
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}

	static async updateUserBalance( userBalance: UserBalance ) {

		return fetch( "http://localhost:8080/user/updateBalance", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( userBalance )
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => { return data; })
		.catch( error => { throw error });
	}
}
