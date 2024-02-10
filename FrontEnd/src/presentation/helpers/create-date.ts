
export const createDateForRequest = ( dateString: string ) => {

	if ( dateString.includes( "." ) )
		dateString = dateString.split( "." )[0];

	const date = new Date( dateString );
	
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	if ( month < 10 && day < 10 ) return `${year}-0${month}-0${day}`;
	if ( month < 10 ) return `${year}-0${month}-${day}`;
	if ( day < 10 ) return `${year}-${month}-0${day}`;

	return `${year}-${month}-${day}`;
}
