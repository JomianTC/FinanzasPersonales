import { closeUpdateTransactionModal, getBalanceInfo, openUpdateTransactionModal } from "../../infrastructure/index";
import { createDateForRequest } from "../helpers/create-date";
import { updateTransaction } from "./requests";

const modalMethod = document.querySelector( "#modalMethod" ) as HTMLSelectElement;
const modalMovement = document.querySelector( "#modalMovement" ) as HTMLSelectElement;
const modaltMount = document.querySelector( "#modalMount" ) as HTMLInputElement;
const modaltDescription = document.querySelector( "#modalDescription" ) as HTMLInputElement;
const modaltDate = document.querySelector( "#modalDate" ) as HTMLInputElement;
const modalUpdate = document.querySelector( "#updateTransactionModalBtn" ) as HTMLButtonElement;

let transactionID: string;
let oldMethod: string;
let oldMovement: string;
let oldMount: number;
let oldDescription: string;
let oldDate: string;

let historyTitle: HTMLHeadingElement;

export const setTransactionInfoInModal = async ( historyTitleParam: HTMLHeadingElement, target: HTMLElement ) => {
	
	openUpdateTransactionModal();
	
	historyTitle = historyTitleParam;
	const updateThing = target.closest( "tr" )!.querySelectorAll( "td" );	

	transactionID 	= updateThing[0].textContent!;
	oldMethod 		= updateThing[1].textContent!;
	oldMovement 	= updateThing[2].textContent!;
	oldMount 		= Number( updateThing[3].textContent );
	oldDescription 	= updateThing[4].textContent!;
	oldDate 		= updateThing[5].textContent!;

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
}

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

	const { movement, mount } = getBalanceInfo( balanceInfo );

	const transaction = {
		id: transactionID!,
		method: modalMethod.value,
		movement: modalMovement.value,
		mount: Number( modaltMount.value ),
		description: modaltDescription.value,
		date: createDateForRequest( modaltDate.value + "T00:00:00" )
	};

	const newBalance = {
		movement,
		mount
	}

	const [ updateError, updateSuccess ] = await updateTransaction( transaction, newBalance );

	if ( updateError ){
		closeUpdateTransactionModal();
		historyTitle.innerText = updateError;
	}

	if ( updateSuccess ) window.location.reload();
});
