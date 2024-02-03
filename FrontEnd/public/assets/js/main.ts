import { 
	HttpRequest, 
	sortTransactionsByDate, 
	getTransactionsByCash, 
	getTransactionsByCard, 
	Transaction,
	createDateHttpRequest,
	createModal,
	openModal,
	closeModal,
	getNewUserBalance,
} from './helpers';

type UserLocalStore = { 
	id: string, 
	name: string, 
	balance: number
}

const userData: UserLocalStore = JSON.parse( localStorage.getItem( "user" )! );

const showTransactions = ( transactions: any, transactionTable: HTMLTableElement ) => {

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
				<td>${ createDateHttpRequest( transaction.date ) }</td>
				<td><button class="btnUpdate">Actualizar</button></td>
				<td><button class="btnDelete">Eliminar</button></td>
			</tr>
		`;	

		transactionTable.appendChild( newTr );
	});
}

const tableDeleteLogic = async ( historyTitle: HTMLHeadingElement, target: HTMLElement ) => {

	const transactionInfo = target.closest( "tr" )!.querySelectorAll( "td" );

	const userBalance = {
		userId: userData.id, 
		movement: "",
		mount: Number( transactionInfo[ 3 ].textContent! )
	}

	if ( transactionInfo[ 2 ].textContent === "Ingreso" )
		userBalance.movement = "COST";
			
	if ( transactionInfo[ 2 ].textContent === "Egreso" )
		userBalance.movement = "INCOME";

	try {
					
		await HttpRequest.deleteTransaction( transactionInfo[0].textContent! );
		const userNewBalance = await HttpRequest.updateUserBalance( userBalance );
		localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
					
		window.location.reload();
		
	} catch ( error ) { historyTitle.innerText = "Historial - Error al eliminar la transacción"; }
}

const tableUpdateLogic = ( historyTitle: HTMLHeadingElement, target: HTMLElement ) => {
	
	openModal();
			
	const modalMethod = document.querySelector( "#modalMethod" ) as HTMLSelectElement;
	const modalMovement = document.querySelector( "#modalMovement" ) as HTMLSelectElement;
	const modaltMount = document.querySelector( "#modalMount" ) as HTMLInputElement;
	const modaltDescription = document.querySelector( "#modalDescription" ) as HTMLInputElement;
	const modaltDate = document.querySelector( "#modalDate" ) as HTMLInputElement;
	const modalUpdate = document.querySelector( "#updateTransactionModalBtn" ) as HTMLButtonElement;

	const updateThing = target.closest( "tr" )!.querySelectorAll( "td" );	

	const transactionID = updateThing[0].textContent;
	const oldMethod = updateThing[1].textContent;
	const oldMovement =	updateThing[2].textContent;
	const oldMount = Number( updateThing[3].textContent );
	const oldDescription = updateThing[4].textContent;
	const oldDate = updateThing[5].textContent;

	if ( oldMethod === "Efectivo" )
		modalMethod.value = "CASH";

	if ( oldMethod === "Tarjeta" )
		modalMethod.value = "CARD";

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

		const { movement, mount } = getNewUserBalance( balanceInfo );

		const transaction = {
			id: transactionID!,
			method: modalMethod.value,
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
			
			if ( !( movement === "INCOME" && mount === 0 ) ){
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

const transactionTableEventListener = ( transactionTable: HTMLTableElement ) => {

	const historyTitle = document.querySelector( "#historyTitle" ) as HTMLHeadingElement;

	transactionTable.addEventListener( "click", async ( event ) => {
	
		const target = event.target! as HTMLElement;
		
		if ( target.classList.contains( "btnDelete" ) )
			tableDeleteLogic( historyTitle, target );

		if ( target.classList.contains( "btnUpdate" ) )
			tableUpdateLogic( historyTitle, target );
	});
};

const createTransactionLogic = async() => {

	const tranTittle = document.querySelector( "#addTransactionTittle" ) as HTMLHeadingElement;

	const methodSelector = document.querySelector( "#addMethodInput" ) as HTMLSelectElement;
	const movementSelector = document.querySelector( "#addMovementInput" ) as HTMLSelectElement;
	const mountInput = document.querySelector( "#addMountInput" ) as HTMLInputElement;
	const descriptionInput = document.querySelector( "#addDescriptionInput" ) as HTMLInputElement;
	const dateInput = document.querySelector( "#addDateInput" ) as HTMLInputElement;

	const addTransactionBtn = document.querySelector( "#addTransactionBtn" ) as HTMLButtonElement;

	addTransactionBtn.addEventListener( "click", async () => {

		if ( methodSelector.value === "" )
			return tranTittle.innerText = "Agregar - Seleccione un metodo de pago";

		if ( movementSelector.value === "" )
			return tranTittle.innerText = "Agregar - Seleccione un movimiento";

		if ( mountInput.value === "" )
			return tranTittle.innerText = "Agregar - Ingrese un monto valido";

		if ( dateInput.value === "" )
			dateInput.value = new Date().toLocaleDateString();

		const transaction = {
			user: userData.id,
			method: methodSelector.value,
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
		} 
		catch ( error ) {
			console.log( error ); 
			tranTittle.innerText = "Agregar - Error al crear la transacción";
		}
	});
};

( async () => {

	const userH1 = document.querySelector( "#userH1" ) as HTMLHeadingElement;
	userH1.innerText = `${ userData.name }\nTu balance actual es: ${ userData.balance }`;

	const cashTransactionTable = document.querySelector( "#cashTransactionTable" ) as HTMLTableElement;
	const cardTransactionTable = document.querySelector( "#cardTransactionTable" ) as HTMLTableElement;

	createTransactionLogic();

	try {
		
		const userTransactions = await HttpRequest.getTransactions( userData.id );
		const userTransactionsSorted = sortTransactionsByDate( userTransactions );

		const cashTransactions = getTransactionsByCash( userTransactionsSorted );
		const cardTransactions = getTransactionsByCard( userTransactionsSorted );

		if ( cashTransactions.length === 0 )
			cashTransactionTable.innerHTML += `
				<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
		else showTransactions( cashTransactions, cashTransactionTable );

		if ( cardTransactions.length === 0 )
			cardTransactionTable.innerHTML += `
				<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
		else showTransactions( cardTransactions, cardTransactionTable );
	} 
	catch ( error ) {

		console.log( error );
		
		cashTransactionTable.innerHTML += `
			<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;

		cardTransactionTable.innerHTML += `
			<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
	}

	createModal();
	
	transactionTableEventListener( cardTransactionTable );
	transactionTableEventListener( cashTransactionTable );
})();
