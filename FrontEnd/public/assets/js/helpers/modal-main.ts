const updateTransactionModal = document.querySelector( "#updateModal" ) as HTMLButtonElement;
const btnCloseUpdateModal = document.querySelector( ".closeModal" ) as HTMLSpanElement;

export const createModal = () => {
	window.addEventListener( "click", (event) => {
		if ( event.target === updateTransactionModal )
			closeModal();
	});
}

export const openModal = () => {
	updateTransactionModal.style.display = "block";
}

export const closeModal = () => {
	updateTransactionModal.style.display = "none";
}

btnCloseUpdateModal.addEventListener( "click", closeModal );
