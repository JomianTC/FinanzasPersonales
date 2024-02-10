import { CreateTransaction } from "../../infrastructure/index";
import { TransactionsService } from "../services/transactions.service";
import { UserService } from "../services/user.service";

// Funcion que nos crea 100 registros aleatorios
export const createHundredTransactions = async ( token: string ) => {

	try {

		const randomTransactions: CreateTransaction[] = [];

		for ( let i = 0; i < 20; i++ ) {

			const method = Math.random() < 0.5 ? 'CASH' : 'CARD';
			const movement = Math.random() < 0.5 ? 'COST' : 'INCOME';
			const mount = Math.floor( Math.random() * 5000 ) + 100;
			const description = `Transacción ${ i + 100 }`;
			
			const month = Math.floor( Math.random() * 12 ) + 1;
			const day = Math.floor( Math.random() * 31 ) + 1;

			if ( day < 10 && month < 10 ){
				randomTransactions.push({ method, movement, mount, description, date: `2023-0${ month }-0${ day }` });
				continue;
			}
			
			if ( month < 10 ){
				randomTransactions.push({ method, movement, mount, description, date: `2023-0${ month }-${ day }` });
				continue;
			}
			
			if ( day < 10 ){
				randomTransactions.push({ method, movement, mount, description, date: `2023-${ month }-0${ day }` });
				continue;
			}
		
			randomTransactions.push({ method, movement, mount, description, date: `2023-${ month }-${ day }` });
		}

		randomTransactions.forEach( async ( transaction ) => {

			await TransactionsService.createTransaction( transaction, token );
			const userNewBalance = await UserService.updateUserBalance({
					movement: transaction.movement,
					mount: transaction.mount
				},
				token 
			);

			localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
		});
		
	} catch ( error ) { console.log( error ); }
}
