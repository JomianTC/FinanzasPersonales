import { AuthService } from "./services/auth.service";

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

			const { token, user } =  await AuthService.loginUser({ email, password });

			if ( !token ) throw "No se encontro el token";
			if ( !user ) throw "Informacion del usuario no encontrada";

			localStorage.setItem( "token", JSON.stringify( token ) );
			localStorage.setItem( "user", JSON.stringify({ name: user.name, balance: user.balance }) );
			window.location.href = "main.html";

		} catch ( error ) { 
			console.log( error );
			errorMessage.textContent = "Error al iniciar sesión, intente de nuevo.";
		}
	});
})();
