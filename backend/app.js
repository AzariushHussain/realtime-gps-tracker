require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { setIo } = require('./utils/redis');
const { registerSocket } = require('./utils/socket');
const { responseMessages } = require('./utils/constants');
const { formatMessage } = require('./utils/messageFormatter');
const routes = require('./routes/index');
const { mongooseConnection } = require('./utils/db');
const cors = require('cors');

const app = express();  
const server = http.createServer(app);
app.use(cors({
    origin: '*'
}));

(async () => {
    try {
        const mongoDbConn = mongooseConnection;
        const message = formatMessage(responseMessages.success.operationSuccessful, { operation: 'Database connection' });
        console.log(message);
    } catch (error) {
        console.error(error);
        const message = formatMessage(responseMessages.error.failed, { operation: 'Database connection' });
        console.error(message);
        process.exit(1);
    }
})();

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

setIo(io);
registerSocket(io)

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT 

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });