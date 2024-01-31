import { HttpRequest } from "./helpers/http-requests";

(() => {

	const formInput = document.querySelector('#formInput') as HTMLFormElement;
	const inputEmail = document.querySelector('#inputEmail') as HTMLInputElement;
	const inputPassword = document.querySelector('#inputPassword') as HTMLInputElement;
	const inputButton = document.querySelector('#inputButton') as HTMLButtonElement;

	inputButton.addEventListener( "click", async( event ) => {

		event.preventDefault();

		const email = inputEmail.value;
		const password = inputPassword.value;

		try {

			const { id, name, balance } =  await HttpRequest.loginUser( email, password );
			localStorage.setItem( "user", JSON.stringify({ id, name, balance }) );
			window.location.href = "main.html";

		} catch ( error ) {

			const errorMessage = document.createElement( "p" );
			errorMessage.textContent = `Usuario o contraseña incorrectos`;
			formInput.appendChild( errorMessage );
		}
	});
})();