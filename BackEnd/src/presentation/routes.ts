import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";

export class ApplicationRoutes {

	static get routes(): Router{

		const router = Router();

		router.use( "/auth", AuthRoutes.routes );

		return router;
	}
}

