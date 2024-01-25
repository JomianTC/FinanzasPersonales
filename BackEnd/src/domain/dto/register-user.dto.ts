import { Validators } from "../../config";

export class RegisterUserDTO {

	constructor(
		public name: string,
		public email: string,
		public password: string,
	){}

	static create( object: { [ keys: string ]: any }): [ string?, RegisterUserDTO? ]{

		const { name, email, password } = object;

		if ( !name ) return [ "Missing name" ]; 
		
		if ( !email ) return [ "Missing email" ]; 
		if ( !Validators.email.test( email ) ) return [ "Email not valid" ];

		if ( !password ) return [ "Missing password" ]; 
		if ( password < 6 ) return [ "Password to short" ]; 

		return [ undefined, new RegisterUserDTO( name, email, password ) ];
	}
}
