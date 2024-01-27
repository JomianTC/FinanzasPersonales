import { Router } from "express";
import { TransactionsController } from "./transactions.controller";
import { TransactionDatasourceImpl, TransactionRepositoryImpl } from "../../infrastructure";

export class TransactionsRoutes {

	static get routes(): Router {

		const router = Router();

		const datasource = new TransactionDatasourceImpl();
		const repository = new TransactionRepositoryImpl( datasource );
		const controller = new TransactionsController( repository );		

		router.post( "/", controller.getTransactions.bind( controller ) );
		router.post( "/create", controller.createTransaction.bind( controller ) );
		router.put( "/update", controller.updateTransactions.bind( controller ) );
		router.delete( "/delete", controller.deleteTransaction.bind( controller ) );

		return router;
	}
}

/*

ERROR SIN BIND
TypeError: Cannot read properties of undefined (reading 'transactionRepository')

*/

