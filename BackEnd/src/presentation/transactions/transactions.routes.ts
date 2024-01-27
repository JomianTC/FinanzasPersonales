import { Router } from "express";
import { TransactionsController } from "./transactions.controller";
import { TransactionDatasourceImpl, TransactionRepositoryImpl } from "../../infrastructure";

export class TransactionsRoutes {

	static get routes(): Router {

		const router = Router();

		const datasource = new TransactionDatasourceImpl();
		const repository = new TransactionRepositoryImpl( datasource );
		const controller = new TransactionsController( repository );		

		router.post( "/", controller.getTransactions );
		router.post( "/create", controller.createTransaction );
		router.put( "/update", controller.updateTransactions );
		router.delete( "/delete", controller.deleteTransaction );

		return router;
	}
}
