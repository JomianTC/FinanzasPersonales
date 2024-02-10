import { getTransactionIdAndDelete } from "./delete-transaction.js";
import { setTransactionInfoInModal } from "./update-transaction.js";

const cashTransactionTable = document.querySelector( "#cashTransactionTable" ) as HTMLTableElement;
const cardTransactionTable = document.querySelector( "#cardTransactionTable" ) as HTMLTableElement;
const historyTitle = document.querySelector( "#historyTitle" ) as HTMLHeadingElement;

export const createTransactionTableListener = () => {

	cashTransactionTable.addEventListener( "click", async ( event ) => {
	
		const target = event.target! as HTMLElement;
		
		if ( target.classList.contains( "btnDelete" ) )
			await getTransactionIdAndDelete( historyTitle, target );

		if ( target.classList.contains( "btnUpdate" ) )
			await setTransactionInfoInModal( historyTitle, target );
	});

	cardTransactionTable.addEventListener( "click", async ( event ) => {
	
		const target = event.target! as HTMLElement;
		
		if ( target.classList.contains( "btnDelete" ) )
			await getTransactionIdAndDelete( historyTitle, target );

		if ( target.classList.contains( "btnUpdate" ) )
			await setTransactionInfoInModal( historyTitle, target );
	});
};
