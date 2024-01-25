import { Validators } from "../../config";

export class LoginUserDTO {

	constructor(
		public email: string,
		public password: string,
	){}

	static create( object: { [ keys: string ]: any }): [ string?, LoginUserDTO? ]{

		const { email, password } = object;

		if ( !email ) return [ "Missing email" ]; 
		if ( !Validators.email.test( email ) ) return [ "Email not valid" ];

		if ( !password ) return [ "Missing password" ]; 

		return [ undefined, new LoginUserDTO( email, password ) ];
	}
}
