const socketIO = require('socket.io');

const userRoomMapping = {};

const initializeSocketIO = async (server) => {
    const io = socketIO(server);
    io.on('connection', (socket) => oneConnection(io, socket));
    return io;
};

module.exports = { initializeSocketIO };

async function oneConnection(io, socket) {
    console.log(`New client connected: ${socket.id}`);

    socket.on('query', async (data) => {
        let serverResponse = 'Some response from the server';
        
        console.log("User Query: ", data);
        console.log("Server Response: ", data);
        
        socket.emit('response', serverResponse);
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
}