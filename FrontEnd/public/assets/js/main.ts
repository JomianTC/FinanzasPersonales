import { HttpRequest } from "./helpers/http-requests";
import { openModal, createModal } from "./helpers/modal-main";

( async () => {

	createModal();
	
	const userData = JSON.parse( localStorage.getItem( "user" )! );
	const userH1 = document.querySelector( "#userH1" ) as HTMLHeadingElement;
	const transactionTable = document.querySelector( "#transactionTable" ) as HTMLTableElement;

	userH1.innerText = `${userData.name}
		Tu balance actual es: ${ userData.balance }`;

	try {
		
		const userTransactions = await HttpRequest.getTransactions( userData.id );
		
		for ( let i = userTransactions.length - 1; i >= 0; i-- ) {

			const newTr = document.createElement( "tr" );
			
			newTr.innerHTML += `<tr><td>${userTransactions[i].id}</td>`;
			
			( userTransactions[i].movement === "COST" )
				? newTr.innerHTML += `<td>Egreso</td>`
				: newTr.innerHTML += `<td>Ingreso</td>`;
			
			newTr.innerHTML += `
					<td>${userTransactions[i].mount}</td>
					<td>${userTransactions[i].description}</td>
					<td>${new Date( userTransactions[i].date ).toLocaleString()}</td>
					<td><button class="btnUpdate">Actualizar</button></td>
					<td><button class="btnDelete">Eliminar</button></td>
				</tr>
			`;	

			transactionTable.appendChild( newTr );
		}
		
	} catch (error) {	
		transactionTable.innerHTML += `
			<tr>
				<td colspan="5" id="tdError" >Esta celda ocupa toda la fila</td>
			</tr>
		`;
	}

	transactionTable.addEventListener( "click", (event) => {
	
		const target = event.target! as HTMLElement;
		
		if ( target.classList.contains( "btnDelete" ) ) {
			const transactionId = target.closest( "tr" )!
				.querySelector( "td:first-child" )!.textContent;
		
			alert('Transaction ID:' + transactionId);
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
