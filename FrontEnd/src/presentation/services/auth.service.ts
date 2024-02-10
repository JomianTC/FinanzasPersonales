import { envs } from "../../config/env-var.js";
import { RegisterUser, LoginUser } from "../../infrastructure/index.js";

const httpLink = envs.VITE_DEV_LINK;

export class AuthService {

	constructor() {}

	static async loginUser( loginUser: LoginUser ) {
		
		return fetch( httpLink + "auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify( loginUser )
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

	static async registerUser( registerUser: RegisterUser ) {

		return await fetch( httpLink + "auth/register", {
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
		.then( data => data )
		.catch( error => { throw error });
	}
}
