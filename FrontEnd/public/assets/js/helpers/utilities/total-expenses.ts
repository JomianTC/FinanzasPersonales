const totalExpensesModal = document.querySelector( "#totalExpensesModal" ) as HTMLDivElement;
const btnCloseExpensesModal = document.querySelector( "#contentExpensesModal" ) as HTMLSpanElement;

export const createExpensesModal = () => {
	window.addEventListener( "click", ( event ) => {
		if ( event.target === totalExpensesModal )
			closeModal();
	});
}

export const openExpensesModal = () => {
	totalExpensesModal.style.display = "block";
}

export const closeModal = () => {
	totalExpensesModal.style.display = "none";
}

btnCloseExpensesModal.addEventListener( "click", closeModal );
