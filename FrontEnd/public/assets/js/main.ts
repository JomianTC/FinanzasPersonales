import { HttpRequest } from "./helpers/http-requests";
import { openModal, createModal } from "./helpers/modal-main";
import { createDateHttpRequest } from './helpers/create-date';
import { transactionBubbleSortDate } from "./helpers/sort-transactions-date";

type UserLocalStore = { 
	id: string, 
	name: string, 
	balance: number
}

const userData: UserLocalStore = JSON.parse( localStorage.getItem( "user" )! );

const transactionTableEventListener = ( transactionTable: HTMLTableElement ) => {

	transactionTable.addEventListener( "click", async ( event ) => {
	
		const target = event.target! as HTMLElement;
		
		if ( target.classList.contains( "btnDelete" ) ) {

			const transactionInfo = target.closest( "tr" )!
				.querySelectorAll( "td" );

			const userBalance = {
				userId: userData.id, 
				movement: "",
				mount: Number( transactionInfo[ 2 ].textContent! )
			}

			if ( transactionInfo[ 1 ].textContent === "Ingreso" )
				userBalance.movement = "COST";
			
			if ( transactionInfo[ 1 ].textContent === "Egreso" )
				userBalance.movement = "INCOME";

			console.log( transactionInfo[0].textContent, userBalance );

			try {
					
				await HttpRequest.deleteTransaction( transactionInfo[0].textContent! );
				const userNewBalance = await HttpRequest.updateUserBalance( userBalance );
				localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
					
				window.location.reload();
		
			} catch ( error ) { alert( "Error al eliminar la transacción" ); }
		}

		if ( target.classList.contains( "btnUpdate" ) ) {
			const updateThing = target.closest( "tr" )!
				.querySelectorAll( "td" );	

			updateThing.forEach( (element) => {
				console.log(element.textContent);
			});

			openModal();

			// window.location.reload();
		}
	});
};

const createTransactionLogic = async() => {

	const tranTittle = document.querySelector( "#addTransactionTittle" ) as HTMLHeadingElement;

	const movementSelector = document.querySelector( "#movement" ) as HTMLSelectElement;
	const mountInput = document.querySelector( "#mount" ) as HTMLInputElement;
	const descriptionInput = document.querySelector( "#description" ) as HTMLInputElement;
	const dateInput = document.querySelector( "#date" ) as HTMLInputElement;

	const addTransactionBtn = document.querySelector( "#addTransaction" ) as HTMLButtonElement;

	addTransactionBtn.addEventListener( "click", async () => {

		// "user": "65b96bee7fc2a5cb8e9a7c31",
		// "movement": "INCOME",
		// "mount": "10000",
		// "description": "Salary"
		// "date": "2024-09-29 <-> año-mes-dia "

		const transaction = {
			user: userData.id,
			movement: movementSelector.value,
			mount: Number( mountInput.value ),
			description: descriptionInput.value,
			date: createDateHttpRequest( dateInput.value )
		};

		const userBalance = {
			userId: userData.id, 
			movement: movementSelector.value,
			mount: Number( mountInput.value )
		}

		try {
			
			await HttpRequest.createTransaction( transaction );
			const userNewBalance = await HttpRequest.updateUserBalance( userBalance );
			localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
			
			window.location.reload();

		} catch (error) { tranTittle.innerText += "Error al crear la transacción"; }
	});
};

( async () => {

	const userH1 = document.querySelector( "#userH1" ) as HTMLHeadingElement;
	const transactionTable = document.querySelector( "#transactionTable" ) as HTMLTableElement;

	userH1.innerText = `${userData.name}
		Tu balance actual es: ${ userData.balance }`;

	try {
		
		const userTransactions = await HttpRequest.getTransactions( userData.id );
		const userTransactionsSorted = transactionBubbleSortDate( userTransactions );
		
		userTransactionsSorted.forEach( ( transaction ) => {

			const newTr = document.createElement( "tr" );
			
			newTr.innerHTML += `<tr><td>${ transaction.id }</td>`;
			
			(  transaction.movement === "COST" )
				? newTr.innerHTML += `<td>Egreso</td>`
				: newTr.innerHTML += `<td>Ingreso</td>`;
			
			newTr.innerHTML += `
					<td>${ transaction.mount }</td>
					<td>${ transaction.description }</td>
					<td>${ createDateHttpRequest( transaction.date ) }</td>
					<td><button class="btnUpdate">Actualizar</button></td>
					<td><button class="btnDelete">Eliminar</button></td>
				</tr>
			`;	

			transactionTable.appendChild( newTr );
		});

	} catch ( error ) {	
		transactionTable.innerHTML += `
			<tr>
				<td colspan="5" id="tdError" >No existen transacciones para este Usuario</td>
			</tr>
		`;
	}
	
	transactionTableEventListener( transactionTable );

	createModal();
	createTransactionLogic();
})();

/*
[
	{
		"id":			"65b96c157fc2a5cb8e9a7c35",
		"user": 		"65b96bee7fc2a5cb8e9a7c31",
		"movement":		"COST",
		"mount":		100000,
		"description":	"Chips Potatoes",
		"date":			"2024-01-30T21:37:25.195Z"
	}
]
*/
