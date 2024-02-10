import { Transaction, getTransactionsByCard, getTransactionsByCash } from "../../infrastructure/index.js";
import { createDateForRequest } from "../helpers/create-date.js";
import { getUserTransactions } from "./requests.js";

const cashTransactionTable = document.querySelector( "#cashTransactionTable" ) as HTMLTableElement;
const cardTransactionTable = document.querySelector( "#cardTransactionTable" ) as HTMLTableElement;

const transactionTableOriginal = document.querySelector( "#cashTransactionTable" )!.innerHTML;

export const fetchAndDisplayUserTransactions = async ( page: number = 1, transactionLimit: number = 20, reDisplay: number = 0 ): Promise< number | number[] > => {

	const [ noTransactions, transactions ] = await getUserTransactions( page, transactionLimit );

	if ( noTransactions ) {
		cashTransactionTable.innerHTML += noTransactions;
		cardTransactionTable.innerHTML += noTransactions;		
		return 0;
	}
	
	const cashTransactions = getTransactionsByCash( transactions! );
	const cardTransactions = getTransactionsByCard( transactions! );
	
	if ( cashTransactions.length === 0 )
		cashTransactionTable.innerHTML += noTransactions;
	
	if ( cardTransactions.length === 0 )
		cardTransactionTable.innerHTML += noTransactions;
		
	if ( reDisplay === 1 )
		return displayTransactions( cashTransactions, cashTransactionTable );
	
	if ( reDisplay === 2 )
		return displayTransactions( cardTransactions, cardTransactionTable );

	let totalTransactionsObtained: number[] = [];

	totalTransactionsObtained.push( displayTransactions( cashTransactions, cashTransactionTable ) );
	totalTransactionsObtained.push( displayTransactions( cardTransactions, cardTransactionTable ) );

	return totalTransactionsObtained;
};

const displayTransactions = ( transactions: Transaction[], transactionTable: HTMLTableElement ) => {

	transactionTable.innerHTML = transactionTableOriginal;

	transactions.forEach( ( transaction: Transaction ) => {

		const newTr = document.createElement( "tr" );
			
		newTr.innerHTML += `<tr><td>${ transaction.id }</td>`;

		(  transaction.method === "CASH" )
			? newTr.innerHTML += `<td>Efectivo</td>`
			: newTr.innerHTML += `<td>Tarjeta</td>`;
			
		(  transaction.movement === "COST" )
			? newTr.innerHTML += `<td>Egreso</td>`
			: newTr.innerHTML += `<td>Ingreso</td>`;
			
		newTr.innerHTML += `
				<td>${ transaction.mount }</td>
				<td>${ transaction.description }</td>
				<td>${ createDateForRequest( transaction.date ) }</td>
				<td><button class="btnUpdate">Actualizar</button></td>
				<td><button class="btnDelete">Eliminar</button></td>
			</tr>
		`;	

		transactionTable.appendChild( newTr );
	});

	return transactions.length;
}