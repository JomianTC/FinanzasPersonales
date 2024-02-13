import { openExpensesModal } from "../../infrastructure/index.js";
import { getLastMonthExpenses } from "./requests.js";

const titleTotalExpenses = document.querySelector( "#titleTotalExpenses" ) as HTMLHeadingElement;
const mountTotalExpenses = document.querySelector( "#mountTotalExpenses" ) as HTMLSpanElement;
const totalExpensesBtn = document.querySelector( "#totalExpensesBtn" ) as HTMLButtonElement;

const showLastMonthExpenses = async () => {

	const [ expensesError, totalExpenses ] = await getLastMonthExpenses();

	if ( expensesError ) return;

	const lastDayPastMonth = new Date( new Date().getFullYear(), new Date().getMonth(), 1 );
	lastDayPastMonth.setDate( lastDayPastMonth.getDate() - 1 );
		
	const month = lastDayPastMonth.getMonth();
	const year = lastDayPastMonth.getFullYear();
	const todayIs = new Date( year, month, 1 );
		
	const monthText = todayIs.toLocaleDateString( "es-ES", { month: 'long' } );

	titleTotalExpenses.innerText = `Gastos totales del mes de ${ monthText }`;
	mountTotalExpenses.innerText = `$${ totalExpenses }`;
		
	openExpensesModal();
};

export const createNotificationLastMonthExpenses = () => {
	
	if ( !window.Notification )
		console.log( "Este navegador no soporta notificaciones" );

	if ( Notification.permission !== "granted" )
		Notification.requestPermission();

	if ( new Date().getDate() === 1 ){

		totalExpensesBtn.hidden = false;

		const montlyNotitifaction = new Notification( "Altas Finanzas", {
			icon: "../../../assets/icon/favicon.ico",
			body: "Los gastos del mes estan disponibles"
		});

		montlyNotitifaction.onclick = () => showLastMonthExpenses();
	}
};

totalExpensesBtn.addEventListener( "click", async () => { await showLastMonthExpenses(); });