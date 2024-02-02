import { HttpRequest } from "./helpers/http-requests";
import { openModal, createModal, closeModal } from "./helpers/modal-main";
import { createDateHttpRequest } from './helpers/create-date';
import { transactionBubbleSortDate } from "./helpers/sort-transactions-date";
import { calculateNewBalance } from "./helpers/update-transaction-balance";

type UserLocalStore = { 
	id: string, 
	name: string, 
	balance: number
}

const userData: UserLocalStore = JSON.parse( localStorage.getItem( "user" )! );

const transactionTableEventListener = ( transactionTable: HTMLTableElement ) => {

	const historyTitle = document.querySelector( "#historyTitle" ) as HTMLHeadingElement;

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

			try {
					
				await HttpRequest.deleteTransaction( transactionInfo[0].textContent! );
				const userNewBalance = await HttpRequest.updateUserBalance( userBalance );
				localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
					
				window.location.reload();
		
			} catch ( error ) { historyTitle.innerText = "Historial - Error al eliminar la transacción"; }
		}

		if ( target.classList.contains( "btnUpdate" ) ) {

			openModal();
			
			const modalMovement = document.querySelector( "#modalMovement" ) as HTMLSelectElement;
			const modaltMount = document.querySelector( "#modaltMount" ) as HTMLInputElement;
			const modaltDescription = document.querySelector( "#modaltDescription" ) as HTMLInputElement;
			const modaltDate = document.querySelector( "#modaltDate" ) as HTMLInputElement;
			const modalUpdate = document.querySelector( "#modalUpdate" ) as HTMLButtonElement;

			const updateThing = target.closest( "tr" )!
				.querySelectorAll( "td" );	

			const transactionID = updateThing[0].textContent;
			const oldMovement = updateThing[1].textContent;
			const oldMount = Number( updateThing[2].textContent );
			const oldDescription = updateThing[3].textContent;
			const oldDate = updateThing[4].textContent;

			if ( oldMovement === "Ingreso" )
				modalMovement.value = "INCOME";
			
			if ( oldMovement === "Egreso" )
				modalMovement.value = "COST";

			modaltMount.value = oldMount.toString();
			modaltDescription.value = oldDescription!;
			modaltDate.value = oldDate!;
			
			modalUpdate.addEventListener( "click", async ( event ) => {

				event.preventDefault();

				const balanceInfo = {
					oldMovement: oldMovement!,
					NewMovement: modalMovement.value,
					oldMount: oldMount,
					newMount: Number( modaltMount.value )
				}

				if ( balanceInfo.NewMovement === "INCOME" )
					balanceInfo.NewMovement = "Ingreso";
				
				if ( balanceInfo.NewMovement === "COST" )
					balanceInfo.NewMovement = "Egreso";

				const { movement, mount } = calculateNewBalance( balanceInfo );

				const transaction = {
					id: transactionID!,
					movement: modalMovement.value,
					mount: Number( modaltMount.value ),
					description: modaltDescription.value,
					date: createDateHttpRequest( modaltDate.value + "T00:00:00" )
				};

				const newBalance = {
					userId: userData.id, 
					movement,
					mount
				}

				try {
			
					await HttpRequest.updateTransaction( transaction );
					
					if ( !(movement === "INCOME" && mount === 0) ){
						const userNewBalance = await HttpRequest.updateUserBalance( newBalance );
						localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
					}
					
					window.location.reload();
		
				} catch ( error ) { 
					closeModal();
					historyTitle.innerText = "Historial - Error al actualizar la transacción";
				}
			});
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

		if ( movementSelector.value === "" )
			return tranTittle.innerText = "Agregar - Seleccione un movimiento";

		if ( mountInput.value === "" )
			return tranTittle.innerText = "Agregar - Ingrese un monto valido";

		if ( dateInput.value === "" )
			dateInput.value = new Date().toLocaleDateString();

		const transaction = {
			user: userData.id,
			movement: movementSelector.value,
			mount: Number( mountInput.value ),
			description: descriptionInput.value,
			date: createDateHttpRequest( dateInput.value + "T00:00:00" )
		};

		if ( dateInput.value === "" )
			transaction.date = createDateHttpRequest( new Date().toLocaleDateString() );

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

		} catch (error) { tranTittle.innerText = "Agregar - Error al crear la transacción"; }
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
