import { handleError } from "../helpers/jwt-error.js";
import { getTotalTransactions } from "./requests.js";

const pageCashMax = document.querySelector( "#pageCashMax" ) as HTMLSpanElement;
const pageCardMax = document.querySelector( "#pageCardMax" ) as HTMLSpanElement;

export const displayTotalTransactionPages = async ( transactionLimit: number = 20 ) => {

	const [ totalError, totalTransactions ] = await getTotalTransactions();

	if ( totalError ) return handleError( totalError );

	const totalCashTransactions = totalTransactions!.totalCashTransactions; 
	const totalCardTransactions = totalTransactions!.totalCardTransactions;
	
	if ( totalCashTransactions % transactionLimit === 0 )
		pageCashMax.innerText = ` - ${ totalCashTransactions/transactionLimit } `;
	else pageCashMax.innerText = ` - ${ Math.floor( totalCashTransactions/transactionLimit ) + 1 } `;

	if ( totalCardTransactions % transactionLimit === 0 )
		pageCardMax.innerText = ` - ${ totalCardTransactions/transactionLimit } `;
	else pageCardMax.innerText = ` - ${ Math.floor( totalCardTransactions/transactionLimit ) + 1} `;
}
