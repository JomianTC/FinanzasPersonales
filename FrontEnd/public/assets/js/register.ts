import { HttpRequest } from "./helpers/http-requests";

(() => {

	const formInput = document.querySelector('#formInput') as HTMLFormElement;
	const inputName = document.querySelector( "#inputName" ) as HTMLInputElement;
	const inputEmail = document.querySelector( "#inputEmail" ) as HTMLInputElement;
	const inputPassword = document.querySelector( "#inputPassword" ) as HTMLInputElement;
	const inputButton = document.querySelector( "#inputButton" ) as HTMLButtonElement;

	const errorMessage = document.createElement( "p" );
	formInput.appendChild( errorMessage );

	inputButton.addEventListener( "click", async ( event ) => {
		
		event.preventDefault();

		const name = inputName.value;
		const email = inputEmail.value;
		const password = inputPassword.value;
		
		try {
			
			if ( name === "" ) throw "El nombre es requerido";
			if ( email === "" ) throw "El email es requerido";
			if ( password === "" ) throw "El password es requerido";
			if ( password.length < 6 ) throw "El password debe ser mayor a 6 caracteres";

			await HttpRequest.registerUser({ name, email, password });
			window.location.href = "index.html";

		} catch ( error ) { errorMessage.textContent = error as string; }
	});
})();

