import { envs } from "../../config/env-var.js";
import { CreateTransaction, ReadTransaction, UpdateTransaction } from "../../infrastructure/index.js";

const httpLink = envs.VITE_DEV_LINK;

export class TransactionsService {

	constructor() {}
	
	static async getTransactions( readTransaction: ReadTransaction ) {

		return fetch( httpLink + `transaction?page=${ readTransaction.page }&limit=${ readTransaction.limit }`, {
			method: "POST",
			headers: { "Authorization": readTransaction.token, },
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => data)
		.catch( error => { throw error });
	}

	static async getTotalTransactions( token: string ) {

		return fetch( httpLink + `transaction/total`, {
			method: "POST",
			headers: { "Authorization": token, },
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => data)
		.catch( error => { throw error });
	}

	static async getTotalExpenses( token: string ) {

		return fetch( httpLink + `transaction/lastMonth`, {
			method: "POST",
			headers: { "Authorization": token, }
		})
		.then( async response => {
			if ( !response.ok ) 
				throw await response.json()
				.then( data => { throw data; });
			return response.json();
		})
		.then( data => data )
		.catch( error => { throw error });
	}

	static async createTransaction( createTransaction: CreateTransaction, token: string ) {

		return fetch( httpLink + "transaction/create", {
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
		.then( data => data )
		.catch( error => { throw error });
	}

	static async updateTransaction( updateTransaction: UpdateTransaction, token: string ) {

		return fetch( httpLink + "transaction/update", {
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
		.then( data => data )
		.catch( error => { throw error });
	}

	static async deleteTransaction( transactionID: string, token: string ) {

		return fetch( httpLink + "transaction/delete", {
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
		.then( data => data )
		.catch( error => { throw error });
	}
}
