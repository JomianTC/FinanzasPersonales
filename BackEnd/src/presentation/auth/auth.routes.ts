import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {

	static get routes(): Router {

		const router = Router();

		const datasource = new AuthDatasourceImpl();
		const repository = new AuthRepositoryImpl( datasource );
		const controller = new AuthController( repository );

		router.get( "/", controller.getUser );
		router.delete( "/", controller.deleteUser );
		router.post( "/login", controller.loginUser );
		router.post( "/register", controller.registerUser );

		return router;
	}
}
