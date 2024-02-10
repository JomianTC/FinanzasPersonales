
// import { BrowserWindow, app } from "electron";

// (() => {
// 	main();
// })();

// async function main( ) {
	
// 	// console.dir( app );

// 	// app.on( "before-quit", () => {
// 	// 	console.log( "Saliendo..." );
// 	// });

// 	app.on( "ready", () => {
		
// 		let win = new BrowserWindow({
// 			show: false,
// 			width: 1200,
// 			height: 720,
// 			center: true,
// 		});
		
// 		win.webContents.openDevTools()

// 		win.once( "ready-to-show", () => {
// 			win.show();
// 		});

// 		// win.on( "move", () => {
// 			// 	const position = win.getPosition();
// 			// console.log( `La posición es ${position}` );
// 		// });

// 		win.on( "closed", () => {
// 			app.quit();
// 		});

// 		// Cargamos una pagina de manera remota
// 		win.loadURL( "http://localhost:5173/public/index.html" );

// 		// Cargamos una pagina de manera local
// 		// win.loadURL( `file://${ __dirname }/../public/index.html` );
// 	});
// }

