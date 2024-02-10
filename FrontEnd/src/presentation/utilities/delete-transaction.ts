import { deleteTransaction } from "./requests";

export const getTransactionIdAndDelete = async ( historyTitle: HTMLHeadingElement, target: HTMLElement ) => {

	const transactionInfo = target.closest( "tr" )!.querySelectorAll( "td" );

	const transactionID = transactionInfo[0].textContent!;
	let movement: string = "";
	const mount = Number( transactionInfo[ 3 ].textContent! );
	
	if ( transactionInfo[ 2 ].textContent === "Ingreso" )
		movement = "COST";
			
	if ( transactionInfo[ 2 ].textContent === "Egreso" )
		movement = "INCOME";

	const [ deleteError, deleteSuccess ] = await deleteTransaction( transactionID, movement, mount );

	if ( deleteError ) return historyTitle.innerText = deleteError;

	if ( deleteSuccess ) window.location.reload();

	return;
}
