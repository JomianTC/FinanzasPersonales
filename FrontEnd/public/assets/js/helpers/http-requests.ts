type CreateTransaction = {
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
	movement: String;
	mount: Number;
}

type RegisterUser = {
	name: string;
	email: string;
	password: string;
}

const linkDeveloper: string = "http://localhost:8080/";
// const linkDeveloper: string = "https://lp87h1x1-8080.usw3.devtunnels.ms/";

export class HttpRequest {

	constructor() {}

	static async loginUser( email: string, password: string ) {
		
		return fetch( linkDeveloper + "auth/login", {
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

		return await fetch( linkDeveloper + "auth/register", {
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
	
	static async getTransactions( id: string, token: string, page: number = 1, limit: number = 20 ) {

		return fetch( linkDeveloper + `transaction?page=${ page }&limit=${ limit }`, {
			method: "POST",
			headers: { 
				"Authorization": token,
				"Content-Type": "application/json"
			},
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

	static async getTotalExpenses( token: string ) {

		return fetch( linkDeveloper + `transaction/lastMonth`, {
			method: "POST",
			headers: { "Authorization": token, }
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

	static async createTransaction( createTransaction: CreateTransaction, token: string ) {

		return fetch( linkDeveloper + "transaction/create", {
			method: "POST",
			headers: { 
				"Authorization": token,
				"Content-Type": "application/json"
			},
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

	static async updateTransaction( updateTransaction: UpdateTransaction, token: string ) {

		return fetch( linkDeveloper + "transaction/update", {
			method: "PUT",
			headers: { 
				"Authorization": token,
				"Content-Type": "application/json"
			},
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

	static async deleteTransaction( transactionID: string, token: string ) {

		return fetch( linkDeveloper + "transaction/delete", {
			method: "DELETE",
			headers: { 
				"Authorization": token,
				"Content-Type": "application/json"
			},
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

	static async updateUserBalance( userBalance: UserBalance, token: string ) {

		return fetch( linkDeveloper + "user/updateBalance", {
			method: "PUT",
			headers: { 
				"Authorization": token,
				"Content-Type": "application/json"
			},
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
