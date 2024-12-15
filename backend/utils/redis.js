const { Server } = require('socket.io');
const redis = require('redis');
const { responseMessages } = require('./constants');
const { formatMessage } = require('./messageFormatter');

const publisher = redis.createClient({
    url: process.env.REDIS_URI
});

const subscriber = redis.createClient({
    url: process.env.REDIS_URI
});

let io;

function handleRedisConnection(client, name) {

    client.on('error', (error) => {
        console.error(`${name} Redis connection error:`, error);
    });

    client.on('connect', () => {
        console.log(`${name} Redis connected`);
    });

    client.on('reconnecting', () => {
        console.log(`${name} Redis reconnecting`);
    });

    client.on('ready', () => {
        console.log(`${name} connection ready`);
    });
}

handleRedisConnection(publisher, 'Publisher');
handleRedisConnection(subscriber, 'Subscriber');

(async () => {
    try {
        await publisher.connect();
        await subscriber.connect();
    
        const channels = ['locationUpdate']
        await subscriber.subscribe(channels, (message, channel) => {
            console.log(`Received message from ${channel}: ${message}`);
            const parsedMessage = JSON.parse(message);
            handleIncomingMessage(channel, parsedMessage);
    });
        
    } catch (error) {
        console.error('Redis connection error:', error);
    }
})();


function handleIncomingMessage(channel, message) {
    switch(channel) {
        case 'locationUpdate':
            console.log('Location update received:', message);
            broadcastToWebSocketClients(channel, message);
            break;
        default:
            console.log('Unknown channel:', channel);
    }
}

function broadcastToWebSocketClients(channel, payload) {
    if(io === undefined) {
        const message = formatMessage(responseMessages.error.notInitialized, { operation: 'Socket.io' });
        console.error(message);
        return;
    }
    console.log(`Broadcasting message to ${channel}:`, payload);
    io.emit(channel, payload);
}

async function publishEvent(channel, payload) {
    try {
        await publisher.publish(channel, JSON.stringify(payload));
        console.log(`Published message to ${channel}: ${payload}`);
    } catch (error) {
        console.error(`Error publishing message to ${channel}:`, error);
    }
}

module.exports =  {
    publishEvent, 
    setIo: (socketIo) => {
        io = socketIo;
    }
}