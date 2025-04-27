const socketIO = require('socket.io');
const { googleGeminiQuery, claudeQuery, openAiQuery } = require('./services/ModelService.js');

var userSocketMapping = {};

const initializeSocketIO = async (server) => {
    const io = socketIO(server);
    io.on('connection', (socket) => oneConnection(io, socket));
    return io;
};

module.exports = { initializeSocketIO };

async function oneConnection(io, socket) {
    console.log(`New client connected: ${socket.id}`);
    userSocketMapping[socket.id] = [];

    socket.on('query', async (data) => {
        if('undefined' != typeof data && data != null && 'object' == typeof data){
            if('undefined' != typeof data.query && 'undefined' != typeof data.model){
                let userModel = (data.model).toLowerCase();
                userSocketMapping[socket.id].push(data.query);
                if(userModel == 'google gemini'){
                    let serverResponse = await googleGeminiQuery(userSocketMapping[socket.id]);
                    userSocketMapping[socket.id].push(serverResponse);
                    socket.emit('response', serverResponse);
                }else if(userModel == 'anthropic claude'){
                    let serverResponse = await claudeQuery(userSocketMapping[socket.id]);
                    userSocketMapping[socket.id].push(serverResponse);
                    socket.emit('response', serverResponse);
                }else if(userModel == 'openai'){
                    let serverResponse = await openAiQuery(userSocketMapping[socket.id]);
                    userSocketMapping[socket.id].push(serverResponse);
                    socket.emit('response', serverResponse);
                }else{
                    socket.emit('error', {
                        message: "Invalid Model selected"
                    });
                }
            }else{
                socket.emit('error', {
                    message: "Invalid query, Please retry"
                });
            }
        }else{
            socket.emit('error', {
                message: "Invalid data, Please retry"
            });
        }
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete userSocketMapping[socket.id];
    });
}