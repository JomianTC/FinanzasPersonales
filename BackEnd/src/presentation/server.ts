import express, { Router } from "express";
import cors from "cors";

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {

	public readonly app = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor( serverOptions: ServerOptions ){
	
		const { port, routes } = serverOptions;

		this.port = port;
		this.routes = routes;
	}

	start(){

		this.app.use( cors() );
		this.app.use( express.json() );

		this.app.use( this.routes );

		this.app.listen( this.port, () => {
			console.log( `Servidor iniciado en el puerto: ${ this.port }` );
		});
	}
}



