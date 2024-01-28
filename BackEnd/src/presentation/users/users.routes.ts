import { Router } from "express"
import { UsersController } from "./users.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";

export class UsersRoutes {

	static get routes (): Router {

		const router = Router();

		const datasource = new UserDatasourceImpl();
		const repository = new UserRepositoryImpl( datasource );
		const controller = new UsersController( repository );

		router.put( "/updateBalance", controller.updateBalance );

		return router;
	}
}
