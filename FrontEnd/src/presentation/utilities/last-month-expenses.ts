import { openExpensesModal } from "../../infrastructure/index";
import { getLastMonthExpenses } from "./requests";

const titleTotalExpenses = document.querySelector( "#titleTotalExpenses" ) as HTMLHeadingElement;
const mountTotalExpenses = document.querySelector( "#mountTotalExpenses" ) as HTMLSpanElement;
const totalExpensesBtn = document.querySelector( "#totalExpensesBtn" ) as HTMLButtonElement;

export const createNotificationLastMonthExpenses = () => {
	
	if ( !window.Notification )
		console.log( "Este navegador no soporta notificaciones" );

	if ( Notification.permission === "granted" ){
		new Notification( "¡Es el primer día del mes!" );
	}
	else if ( Notification.permission === "denied" || Notification.permission === "default" ){
		Notification.requestPermission( function ( permission ) {
			if ( permission === "granted" )
			new Notification( "¡Es el primer día del mes!" );
		});
	}

	// if ( new Date().getDate() === 1 )
		totalExpensesBtn.hidden = false;
};

totalExpensesBtn.addEventListener( "click", async () => {

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
});