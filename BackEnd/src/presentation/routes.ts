import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { TransactionsRoutes } from "./transactions/transactions.routes";

export class ApplicationRoutes {

	static get routes(): Router{

		const router = Router();

		router.use( "/auth", AuthRoutes.routes );
		router.use( "/transaction", TransactionsRoutes.routes );

		return router;
	}
}

