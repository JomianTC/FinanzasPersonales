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
const token: string = JSON.parse( localStorage.getItem( "token" )! );

let cashTransactions: any;
let cardTransactions: any;
let totalCashTransactions: number = 1;
let totalCardTransactions: number = 1;
let limit: number = 20;

const prevCashBtn = document.querySelector( "#prevCashBtn" ) as HTMLButtonElement;
const nextCashBtn = document.querySelector( "#nextCashBtn" ) as HTMLButtonElement;
const pageCashCounter = document.querySelector( "#pageCashCounter" ) as HTMLSpanElement;
const pageCashMax = document.querySelector( "#pageCashMax" ) as HTMLSpanElement;

const prevCardBtn = document.querySelector( "#prevCardBtn" ) as HTMLButtonElement;
const nextCardBtn = document.querySelector( "#nextCardBtn" ) as HTMLButtonElement;
const pageCardCounter = document.querySelector( "#pageCardCounter" ) as HTMLSpanElement;
const pageCardMax = document.querySelector( "#pageCardMax" ) as HTMLSpanElement;

let cashTransactionTable = document.querySelector( "#cashTransactionTable" ) as HTMLTableElement;
let cardTransactionTable = document.querySelector( "#cardTransactionTable" ) as HTMLTableElement;

const cashTransactionTableOriginal = cashTransactionTable.innerHTML;
const cardTransactionTableOriginal = cardTransactionTable.innerHTML;

const handleJWTError = ( error: string ) => {
	if ( error === "Invalid Token" ){
		alert( "Su sesión ha expirado" );
		window.location.href = "./index.html";
	}

	console.log( error );
}

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
					
		await HttpRequest.deleteTransaction( transactionInfo[0].textContent!, token );
		const userNewBalance = await HttpRequest.updateUserBalance( userBalance, token );
		localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
					
		window.location.reload();
		
	} catch ( error ) { 
		handleJWTError( error );
		historyTitle.innerText = "Historial - Error al eliminar la transacción";
	}
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
	
			await HttpRequest.updateTransaction( transaction, token );
			
			if ( !( movement === "INCOME" && mount === 0 ) ){
				const userNewBalance = await HttpRequest.updateUserBalance( newBalance, token );
				localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
			}
			
			window.location.reload();

		} catch ( error ) { 
			closeModal();
			handleJWTError( error );
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
			method: methodSelector.value,
			movement: movementSelector.value,
			mount: Number( mountInput.value ),
			description: descriptionInput.value,
			date: createDateHttpRequest( dateInput.value + "T00:00:00" )
		};

		if ( dateInput.value === "" )
			transaction.date = createDateHttpRequest( new Date().toLocaleDateString() );

		const userBalance = {
			movement: movementSelector.value,
			mount: Number( mountInput.value )
		}

		try {
			
			await HttpRequest.createTransaction( transaction, token );
			const userNewBalance = await HttpRequest.updateUserBalance( userBalance, token );
			localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
			
			window.location.reload();
		} 
		catch ( error ) {
			handleJWTError( error ); 
			tranTittle.innerText = "Agregar - Error al crear la transacción";
		}
	});
};

const displayCashTransactions = async ( cashPage: number = 1 ) => {

	try {

		const { transactions, totalTransactions } = await HttpRequest.getTransactions( userData.id, token, cashPage, limit );
		
		cashTransactions = getTransactionsByCash( transactions );
		
		if ( cashTransactions.length === 0 )
			cashTransactionTable.innerHTML += `
				<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
		else showTransactions( cashTransactions, cashTransactionTable );

		return totalTransactions.totalCashTransactions;
	} 
	catch ( error ) {

		handleJWTError( error );
		
		cashTransactionTable.innerHTML += `
			<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
	}
};

const displayCardTransactions = async ( cardPage: number = 1 ) => {

	try {

		const { transactions, totalTransactions } = await HttpRequest.getTransactions( userData.id, token, cardPage, limit );

		cardTransactions = getTransactionsByCard( transactions );
		
		if ( cardTransactions.length === 0 )
			cardTransactionTable.innerHTML += `
				<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
		else showTransactions( cardTransactions, cardTransactionTable );

		return totalTransactions.totalCardTransactions
	} 
	catch ( error ) {

		handleJWTError( error );
		
		cardTransactionTable.innerHTML += `
			<tr><td colspan="7" id="tdError" >No existen transacciones</td></tr>`;
	}
};

const createLimitLogic = () => {

	const pagination = document.querySelector( "#numRegistros" ) as HTMLDivElement;

	pagination.addEventListener( "change", ( event ) => {

		const selectedValue = event.target as HTMLSelectElement;
		limit = Number( selectedValue.value );

		cashTransactionTable.innerHTML = cashTransactionTableOriginal;
		cardTransactionTable.innerHTML = cardTransactionTableOriginal;

		pageCardCounter.innerText = "1";
		pageCashCounter.innerText = "1";

		if ( totalCashTransactions % limit === 0 )
			pageCashMax.innerText = ` - ${ totalCashTransactions/limit } `;
		else
			pageCashMax.innerText = ` - ${ Math.floor( totalCashTransactions/limit ) + 1 } `;

		if ( totalCardTransactions % limit === 0 )
			pageCardMax.innerText = ` - ${ totalCardTransactions/limit } `;
		else
			pageCardMax.innerText = ` - ${ Math.floor( totalCardTransactions/limit ) + 1 } `;

		displayCashTransactions();
		displayCardTransactions();
	});
};

const createPageLogic = () => {

	prevCashBtn.addEventListener( "click", () => {

		const pageCash = Number( pageCashCounter.innerText );

		if ( pageCash === 1 ) return;

		pageCashCounter.innerText = ( pageCash - 1 ).toString();

		cashTransactionTable.innerHTML = cashTransactionTableOriginal;
		displayCashTransactions( pageCash - 1 );
	});

	nextCashBtn.addEventListener( "click", () => {

		const pageCash = Number( pageCashCounter.innerText );

		if ( cashTransactions.length < limit ) return;

		pageCashCounter.innerText = ( pageCash + 1 ).toString();

		cashTransactionTable.innerHTML = cashTransactionTableOriginal;
		displayCashTransactions( pageCash + 1 );
	});

	prevCardBtn.addEventListener( "click", () => {

		const pageCard = Number( pageCardCounter.innerText );

		if ( pageCard === 1 ) return;

		pageCardCounter.innerText = ( pageCard - 1 ).toString();

		cardTransactionTable.innerHTML = cardTransactionTableOriginal;
		displayCashTransactions( pageCard - 1 );
	});

	nextCardBtn.addEventListener( "click", () => {

		const pageCard = Number( pageCardCounter.innerText );

		if ( cardTransactions.length < limit ) return;

		pageCardCounter.innerText = ( pageCard + 1 ).toString();

		cardTransactionTable.innerHTML = cardTransactionTableOriginal;
		displayCardTransactions( pageCard + 1 );
	});
};

// Funcion que nos crea registros aleatorios
// const implosion = async () => {

// 	try {

// 		type TransactionImplosion = {
// 			method: string;
// 			movement: string;
// 			mount: number;
// 			description: string;
// 			date: string;
// 		}

// 		const transactionS: TransactionImplosion[] = [];

// 		for (let i = 0; i < 100; i++) {
// 			const method = Math.random() < 0.5 ? 'CASH' : 'CARD';
// 			const movement = Math.random() < 0.5 ? 'COST' : 'INCOME';
// 			const mount = Math.floor(Math.random() * 5000) + 100; // Número aleatorio entre 100 y 5099
// 			const description = `Transacción ${i + 100}`;
// 			// const date = createDateHttpRequest( new Date().toLocaleDateString() );

// 			const randomMonth = Math.floor(Math.random() * 12); // Mes aleatorio entre 0 y 11
// 			const randomDay = Math.floor(Math.random() * 31) + 1; // Día aleatorio entre 1 y 31

// 			const date = new Date( 2023, randomMonth, randomDay );

// 			const year = date.getFullYear();
// 			const month = date.getMonth() + 1;
// 			const day = date.getDate();
		
// 			if ( month < 10 && day < 10 ){
// 				transactionS.push({ method, movement, mount, description, date: `${year}-0${month}-0${day}` });
// 				continue;
// 			} 
// 			if ( month < 10 ){
// 				transactionS.push({ method, movement, mount, description, date: `${year}-0${month}-${day}` });
// 				continue;
// 			} 
// 			if ( day < 10 ){
// 				transactionS.push({ method, movement, mount, description, date: `${year}-${month}-0${day}` });
// 				continue;
// 			} 
		
// 			transactionS.push({ method, movement, mount, description, date: `${year}-${month}-${day}` });
// 		}

// 		transactionS.forEach( async ( transaction ) => {

// 			await HttpRequest.createTransaction( transaction, token );
// 			const userNewBalance = await HttpRequest.updateUserBalance({
// 					movement: transaction.movement,
// 					mount: transaction.mount
// 				},
// 				token 
// 			);
// 			localStorage.setItem( "user", JSON.stringify( userNewBalance ) );
// 		});
		
// 	} catch (error) {
// 		console.log({ error });
// 	}
// }

( async () => {

	const userH1 = document.querySelector( "#userH1" ) as HTMLHeadingElement;
	userH1.innerText = `${ userData.name }\nTu balance actual es: ${ userData.balance }`;

	totalCashTransactions = await displayCashTransactions();
	totalCardTransactions = await displayCardTransactions();

	if ( totalCashTransactions % limit === 0 )
		pageCashMax.innerText = ` - ${ totalCashTransactions/limit } `;
	else
		pageCashMax.innerText = ` - ${ Math.floor( totalCashTransactions/limit ) + 1 } `;

	if ( totalCardTransactions % limit === 0 )
		pageCardMax.innerText = ` - ${ totalCardTransactions/limit } `;
	else
		pageCardMax.innerText = ` - ${ Math.floor( totalCardTransactions/limit ) + 1} `;
	
	createTransactionLogic();
	createLimitLogic();
	
	createModal();
	
	transactionTableEventListener( cardTransactionTable );
	transactionTableEventListener( cashTransactionTable );
	
	createPageLogic();
	// await implosion();
})();
