const { publishEvent } = require('./redis');
const { userEventEmitter } = require('./userEventEmitter');
const { createNewLocation } = require('../models/locationModel');

const registerSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('New connection:', socket.id);

        socket.on('locationUpdate', (data) => {
            console.log('Location update:', data);
            socket.userId = data.userId;
            createNewLocation(data);
            publishEvent('locationUpdate', data);
        });

    });

    io.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
    });
}   


module.exports = { registerSocket };