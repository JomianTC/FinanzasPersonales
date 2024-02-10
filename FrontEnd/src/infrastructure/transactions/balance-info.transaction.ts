type BalanceChangeInfo = {
	oldMovement: string;
	NewMovement: string;
	oldMount: number;
	newMount: number;
}

type UpdatedBalanceInfo = {
	movement: string;
	mount: number;
}

export const getBalanceInfo = ( balanceInfo: BalanceChangeInfo ): UpdatedBalanceInfo => {

	if ( balanceInfo.oldMovement === balanceInfo.NewMovement )
		if ( balanceInfo.oldMount === balanceInfo.newMount )
			return { movement: "INCOME", mount: 0 };

	if ( balanceInfo.oldMovement === "Ingreso" && balanceInfo.NewMovement === "Egreso" )
		return { movement: "COST", mount: balanceInfo.newMount + balanceInfo.oldMount };	
	
	if ( balanceInfo.oldMovement === "Egreso" && balanceInfo.NewMovement === "Ingreso" )
		return { movement: "INCOME", mount: balanceInfo.newMount + balanceInfo.oldMount };	
	
	if ( balanceInfo.oldMovement === "Egreso" && balanceInfo.NewMovement === "Egreso" )
		if ( balanceInfo.oldMount > balanceInfo.newMount )
			return { movement: "INCOME", mount: balanceInfo.oldMount - balanceInfo.newMount };	
		else
			return { movement: "COST", mount: balanceInfo.newMount - balanceInfo.oldMount };	
	
	if ( balanceInfo.oldMovement === "Ingreso" && balanceInfo.NewMovement === "Ingreso" )
		if ( balanceInfo.oldMount > balanceInfo.newMount )
			return { movement: "COST", mount: balanceInfo.oldMount - balanceInfo.newMount };	
		else
			return { movement: "INCOME", mount: balanceInfo.newMount - balanceInfo.oldMount };	

	return { movement: "INCOME", mount: 0 };
};
