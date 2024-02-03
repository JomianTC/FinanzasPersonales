import { HttpRequest } from "./helpers/http-requests";

(() => {

	const formInput = document.querySelector('#formInput') as HTMLFormElement;
	const inputEmail = document.querySelector('#inputEmail') as HTMLInputElement;
	const inputPassword = document.querySelector('#inputPassword') as HTMLInputElement;
	
	const inputButton = document.querySelector('#inputButton') as HTMLButtonElement;

	const errorMessage = document.createElement( "p" );
	formInput.appendChild( errorMessage );

	inputButton.addEventListener( "click", async( event ) => {

		event.preventDefault();

		const email = inputEmail.value;
		const password = inputPassword.value;

		try {

			const userInfo =  await HttpRequest.loginUser( email, password );
			localStorage.setItem( "user", JSON.stringify( userInfo ) );
			window.location.href = "main.html";

		} catch ( error ) { 
			console.log( error );
			errorMessage.textContent = "Error al iniciar sesión, intente de nuevo.";
		}
	});
})();