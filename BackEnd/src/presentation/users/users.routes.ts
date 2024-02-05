import { Router } from "express"
import { UsersController } from "./users.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { JWTMiddleware } from "../middleware/jwt.middleware";

export class UsersRoutes {

	static get routes (): Router {

		const router = Router();

		const datasource = new UserDatasourceImpl();
		const repository = new UserRepositoryImpl( datasource );
		const controller = new UsersController( repository );

		router.put( "/updateBalance", JWTMiddleware.validateJWT, controller.updateBalance );

		return router;
	}
}
