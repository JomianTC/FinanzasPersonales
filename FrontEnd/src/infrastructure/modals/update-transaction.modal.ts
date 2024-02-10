const updateTransactionModal = document.querySelector( "#updateTransactionModal" ) as HTMLButtonElement;
const btnCloseUpdateModal = document.querySelector( ".closeModal" ) as HTMLSpanElement;

export const createUpdateTransactionModal = () => {
	window.addEventListener( "click", ( event ) => {
		if ( event.target === updateTransactionModal )
			closeUpdateTransactionModal();
	});
}

export const openUpdateTransactionModal = () => {
	updateTransactionModal.style.display = "block";
}

export const closeUpdateTransactionModal = () => {
	updateTransactionModal.style.display = "none";
}

btnCloseUpdateModal.addEventListener( "click", closeUpdateTransactionModal );
