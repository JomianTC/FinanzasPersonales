import { CreateTransaction, TotalTransactions, Transaction, UpdateBalance, UpdateTransaction, UserLocalStorage } from "../../infrastructure/index.js";
import { handleError } from "../helpers/jwt-error.js";
import { TransactionsService } from "../services/transactions.service.js";
import { UserService } from "../services/user.service.js";

const token: string = JSON.parse( localStorage.getItem( "token" )! );
const userData: UserLocalStorage = JSON.parse( localStorage.getItem( "user" )! );

export const createTransaction = async ( transaction: CreateTransaction, newBalance: UpdateBalance ): Promise<[ string?, boolean? ]> => {
	
	try {
		
		await TransactionsService.createTransaction( transaction, token );
		const userNewBalance = await UserService.updateUserBalance( newBalance, token );
		localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
		
		return [ undefined, true ];
	} 
	catch ( error ) {
		handleError( error as string ); 
		return [ "Agregar - Error al crear la transacción" ];
	}
};

export const getUserTransactions = async ( page: number = 1, limit: number = 20 ): Promise<[ string?, Transaction[]? ]> => {

	try {

		const transactions = await TransactionsService.getTransactions({ token, page, limit });
		
		if ( transactions.length === 0 )
			return [ "<tr><td colspan=\"7\">No existen transacciones</td></tr>" ] ;
		
		return [ undefined, transactions ];
	} 
	catch ( error ) { handleError( error as string ); }

	return [ "" ] ;
};

export const getTotalTransactions = async (): Promise<[ string?, TotalTransactions? ]> => {

	try {
		
		const { totalCashTransactions, totalCardTransactions } = await TransactionsService.getTotalTransactions( token );

		if ( totalCashTransactions === 0 && totalCardTransactions === 0 )
			return [ "No existen transacciones para este usuario" ] ;
		
		if ( totalCashTransactions === 0 )
			return [ "No existen transacciones con efectivo para este usuario" ] ;
		
		if ( totalCardTransactions === 0 )
			return [ "No existen transacciones con tarjeta para este usuario" ] ;
		
		return [ undefined, { totalCashTransactions, totalCardTransactions } ];
	} 
	catch ( error ) { handleError( error as string ); }

	return [ "" ] ;
};

export const getLastMonthExpenses = async (): Promise<[ string?, number? ]> => {

	try {
		
		const { totalExpenses } = await TransactionsService.getTotalExpenses( token );

		if ( totalExpenses === 0 )
			return [ "No existen gastos para este usuario" ];

		return [ undefined, totalExpenses ];

	} catch ( error ) {
		
		handleError( error as string );
		return [ "Error obteniendo los datos" ];
	}
};

export const deleteTransaction = async ( transactionID: string, movement: string, mount: number ): Promise<[ string?, boolean? ]> => {

	const userBalance = {
		userId: userData.id, 
		movement,
		mount
	}

	try {
					
		await TransactionsService.deleteTransaction( transactionID, token );
		const userNewBalance = await UserService.updateUserBalance( userBalance, token );

		localStorage.setItem( "user", JSON.stringify( userNewBalance ) );			
		
		return [ undefined, true ];
		
	} catch ( error ) { 
		handleError( error as string );
		return [ "Historial - Error al eliminar la transacción" ];
	}
};

export const updateTransaction = async ( transaction: UpdateTransaction, newBalance: UpdateBalance ): Promise<[ string?, boolean? ]> => {
	try {

		await TransactionsService.updateTransaction( transaction, token );
		
		if ( !( newBalance.movement === "INCOME" && newBalance.mount === 0 ) ){
			const userNewBalance = await UserService.updateUserBalance( newBalance, token );
			localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
		}
		
		return [ undefined, true ];

	} catch ( error ) { 
		handleError( error as string );
		return [ "Historial - Error al actualizar la transacción" ];
	}
};