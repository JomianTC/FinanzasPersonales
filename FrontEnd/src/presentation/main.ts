import { UserLocalStorage, createExpensesModal, createUpdateTransactionModal } from "../infrastructure/index.js";
import { createNotificationLastMonthExpenses, createPaginationLogic, createTransactionLogic, createTransactionTableListener, displayTotalTransactionPages } from "./utilities/index.js";

const userData: UserLocalStorage = JSON.parse( localStorage.getItem( "user" )! );
let transactionLimit: number = 20;

const createTransactionLimitListener = () => {

	const pagination = document.querySelector( "#numRegistros" ) as HTMLDivElement;

	pagination.addEventListener( "change", async( event ) => {

		const selectedValue = event.target as HTMLSelectElement;
		transactionLimit = Number( selectedValue.value );

		await createPaginationLogic( transactionLimit );
		await displayTotalTransactionPages( transactionLimit );
	});
};

( async () => {

	const userH1 = document.querySelector( "#userH1" ) as HTMLHeadingElement;
	userH1.innerText = `${ userData.name }\nTu balance actual es: ${ userData.balance }`;
	
	await createPaginationLogic( transactionLimit );
	await displayTotalTransactionPages( transactionLimit );
	
	createUpdateTransactionModal();
	createExpensesModal();
	
	createTransactionLimitListener();
	createTransactionTableListener();
	createTransactionLogic();

	createNotificationLastMonthExpenses();
})();
