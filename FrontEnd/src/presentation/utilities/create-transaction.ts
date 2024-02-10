import { createDateForRequest } from "../helpers/create-date.js";
import { createTransaction } from "./requests.js";

const tranTittle = document.querySelector( "#addTransactionTittle" ) as HTMLHeadingElement;

const methodSelector = document.querySelector( "#addMethodInput" ) as HTMLSelectElement;
const movementSelector = document.querySelector( "#addMovementInput" ) as HTMLSelectElement;
const mountInput = document.querySelector( "#addMountInput" ) as HTMLInputElement;
const descriptionInput = document.querySelector( "#addDescriptionInput" ) as HTMLInputElement;
const dateInput = document.querySelector( "#addDateInput" ) as HTMLInputElement;

const addTransactionBtn = document.querySelector( "#addTransactionBtn" ) as HTMLButtonElement;

// Este metodo no hace nada solo es para indicar que el archivo es llamado
// aun que con importar el archivo index de la carpeta de utilities basta
export const createTransactionLogic = async() => {};

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
		date: createDateForRequest( dateInput.value + "T00:00:00" )
	};

	if ( dateInput.value === "" )
		transaction.date = createDateForRequest( new Date().toLocaleDateString() );

	const userBalance = {
		movement: movementSelector.value,
		mount: Number( mountInput.value )
	}

	const [ createError, createSuccess ] = await createTransaction( transaction, userBalance );

	if ( createError ) tranTittle.innerText = createError;

	if ( createSuccess ) window.location.reload();

	return;
});