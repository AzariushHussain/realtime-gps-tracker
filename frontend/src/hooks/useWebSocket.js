import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const useSocketIO = () => {
  const WS_URL = 'ws://127.0.0.1:8000';  
  const WS_locationUpdate = 'locationUpdate';

  const [socket, setSocket] = useState(null);
  const [userLocations, setUserLocations] = useState([]); 
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?._id); 

  useEffect(() => {
    if (!token) {
      return;
    }

    const socketConnection = io(WS_URL, {
      transports: ['websocket'],
      query: { token },
    });

    setSocket(socketConnection);

    socketConnection.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    socketConnection.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    socketConnection.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
      setError(err);
    });

    socketConnection.on(WS_locationUpdate, (data) => {
      console.log(`Received data on ${WS_locationUpdate}:`, data);
      
      setUserLocations((prevLocations) => {
        const existingIndex = prevLocations.findIndex((loc) => loc.userId === data.userId);

        if (existingIndex !== -1) {
          const existingLocation = prevLocations[existingIndex];
          
          if (
            existingLocation.latitude === data.latitude &&
            existingLocation.longitude === data.longitude
          ) {
            console.log(`No changes in coordinates for userId: ${data.userId}`);
            return prevLocations; 
          }

          const updatedLocations = [...prevLocations];
          updatedLocations[existingIndex] = data;
          return updatedLocations;
        } else {
          return [...prevLocations, data];
        }
      });
    });

    return () => {
      socketConnection.off(WS_locationUpdate); 
      socketConnection.disconnect();
    };

  }, [token, userId]); 

  const sendLocationViaSocket = (message) => {
    if (socket && socket.connected) {
      console.log('Sending location update:', message);
      socket.emit(WS_locationUpdate, message);
    } else {
      console.log('Socket.IO connection is not open');
    }
  };

  return { socket, userLocations, sendLocationViaSocket };
};

export default useSocketIO;
