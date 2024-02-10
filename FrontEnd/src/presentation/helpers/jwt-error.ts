
export const handleError = ( error: string ) => {

	if ( error === "Invalid Token" ){
		alert( "Su sesión ha expirado" );
		window.location.href = "../../../index.html";
	}

	console.log( error );
}
