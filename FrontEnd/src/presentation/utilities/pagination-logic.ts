import { fetchAndDisplayUserTransactions } from "./get-show-transactions.js";

const prevCashBtn = document.querySelector( "#prevCashBtn" ) as HTMLButtonElement;
const nextCashBtn = document.querySelector( "#nextCashBtn" ) as HTMLButtonElement;
const pageCashCounter = document.querySelector( "#pageCashCounter" ) as HTMLSpanElement;

const prevCardBtn = document.querySelector( "#prevCardBtn" ) as HTMLButtonElement;
const nextCardBtn = document.querySelector( "#nextCardBtn" ) as HTMLButtonElement;
const pageCardCounter = document.querySelector( "#pageCardCounter" ) as HTMLSpanElement;

let parcialCashTransactions: number | number[] = 1;
let parcialCardTransactions: number | number[] = 1;
let transactionLimit: number = 20;

export const createPaginationLogic = async( limit: number = 20 ) => {
	
	transactionLimit = limit;

	const parcialTransactions = await fetchAndDisplayUserTransactions( 1, transactionLimit, 0 )
	parcialCashTransactions = parcialTransactions![ 0 ];
	parcialCardTransactions = parcialTransactions![ 1 ];

	pageCardCounter.innerText = "1";
	pageCashCounter.innerText = "1";
};

prevCashBtn.addEventListener( "click", async() => {

	const pageCash = Number( pageCashCounter.innerText );

	if ( pageCash === 1 ) return;

	pageCashCounter.innerText = ( pageCash - 1 ).toString();
	parcialCashTransactions = await fetchAndDisplayUserTransactions( pageCash - 1, transactionLimit, 1 );
});

nextCashBtn.addEventListener( "click", async() => {

	const pageCash = Number( pageCashCounter.innerText );

	if ( parcialCashTransactions as number < transactionLimit ) return;

	pageCashCounter.innerText = ( pageCash + 1 ).toString();
	parcialCashTransactions = await fetchAndDisplayUserTransactions( pageCash + 1, transactionLimit, 1 );
});

prevCardBtn.addEventListener( "click", async() => {

	const pageCard = Number( pageCardCounter.innerText );

	if ( pageCard === 1 ) return;

	pageCardCounter.innerText = ( pageCard - 1 ).toString();
	parcialCardTransactions = await fetchAndDisplayUserTransactions( pageCard - 1, transactionLimit, 2 );
});

nextCardBtn.addEventListener( "click", async() => {

	const pageCard = Number( pageCardCounter.innerText );

	if ( parcialCardTransactions as number < transactionLimit ) return;

	pageCardCounter.innerText = ( pageCard + 1 ).toString();
	parcialCardTransactions = await fetchAndDisplayUserTransactions( pageCard + 1, transactionLimit, 2 );
});
