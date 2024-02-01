
export const createDateHttpRequest = ( dateString: string ) => {

	const date = new Date( dateString );

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const dateFormated = `${year}-${month}-${day}`;

	return dateFormated;
}
