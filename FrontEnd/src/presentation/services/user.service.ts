import { envs } from "../../config/env-var.js";
import { UpdateBalance } from "../../infrastructure/index.js";

const httpLink = envs.VITE_DEV_LINK;

export class UserService {

	constructor() {}

	static async updateUserBalance( userBalance: UpdateBalance, token: string ) {

		return fetch( httpLink + "user/updateBalance", {
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
		.then( data => data )
		.catch( error => { throw error });
	}
}
