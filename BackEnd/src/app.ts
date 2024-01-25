import { Server } from "./presentation/server";
import { envs } from "./config";
import { ApplicationRoutes } from './presentation/routes';
import { MongoDatabase } from "./data/mongo";

(() => {
	main();
})();

async function main() {
	
	await MongoDatabase.connect({
		mongoURL: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME	
	})

	new Server({
		port: envs.PORT,
		routes: ApplicationRoutes.routes
	}).start();
}
