// Express App
const config = require("./config/config.js");
const app = require("./app.js");

// Initiate a http server
const http = require('http');
const server = http.createServer(app);

// Import Websocket server
const { initializeSocketIO } = require('./wsServer.js');

const startServer = async () => {
    try {    
        // Initialize a websocket server
        await initializeSocketIO(server);

        // Start Server
        server.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();