import { Router } from "express";
import { TransactionsController } from "./transactions.controller";
import { TransactionDatasourceImpl, TransactionRepositoryImpl } from "../../infrastructure";
import { JWTMiddleware } from "../middleware/jwt.middleware";

export class TransactionsRoutes {

	static get routes(): Router {

		const router = Router();

		const datasource = new TransactionDatasourceImpl();
		const repository = new TransactionRepositoryImpl( datasource );
		const controller = new TransactionsController( repository );		

		router.post( "/", JWTMiddleware.validateJWT, controller.getTransactions );
		router.post( "/create", JWTMiddleware.validateJWT, controller.createTransaction );
		router.put( "/update", JWTMiddleware.validateJWT, controller.updateTransactions );
		router.delete( "/delete", JWTMiddleware.validateJWT, controller.deleteTransaction );

		return router;
	}
}
