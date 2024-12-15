import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import Logout from './Logout';
import useSocketIO from './hooks/useWebSocket';

const Location = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { sendLocationViaSocket, userLocations } = useSocketIO();

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.warn('No address found for the provided coordinates.');
        return 'Unknown Address';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  useEffect(() => {
    let locationInterval;

    const captureAndSendLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const address = await getAddressFromCoordinates(latitude, longitude);

            sendLocationViaSocket({
              user,
              latitude,
              longitude,
              address,
            });
          },
          (error) => {
            console.error('Error capturing location:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    if (user && user.role !== 'admin') {
      captureAndSendLocation(); 
      locationInterval = setInterval(captureAndSendLocation, 4000);
    }

    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [user, sendLocationViaSocket]);

  const handleShowOnMap = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank'); 
  };

  if (user.role === 'admin') {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="display-6">Welcome, {user.username} (Admin)</h1>
          <Logout onLogout={() => dispatch(logout())} />
        </div>

        <div className="mb-4">
          <h2 className="h5">Active User Locations:</h2>
          <div className="list-group">
            {userLocations.length > 0 ? (
              userLocations.map((location) => (
                <div
                  key={location.user._id}
                  className="list-group-item shadow-sm rounded mb-3 p-3 d-flex align-items-center"
                >
                  <div className="me-3">
                    <div className="fw-bold">{location.user.username}</div>
                    <div className="text-muted">{location.user.role}</div>
                  </div>
                  <div className="d-flex flex-column">
                    <span>
                      <strong>Coordinates:</strong> {location.latitude}, {location.longitude}
                    </span>
                    <span>
                      <strong>Address:</strong> {location.address}
                    </span>
                  </div>
                  <button
                    className="btn btn-info btn-sm ms-auto"
                    onClick={() => handleShowOnMap(location.latitude, location.longitude)}
                  >
                    Show on Map
                  </button>
                </div>
              ))
            ) : (
              <div className="list-group-item">
                No active user locations available.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-6">Welcome, {user.username}!</h1>
        <Logout onLogout={() => dispatch(logout())} />
      </div>

      <div>
        <h2 className="h5 mb-3">Map Instructions:</h2>
        <ul className="list-group">
          <li className="list-group-item">User locations are updated every 4 seconds.</li>
        </ul>
      </div>
    </div>
  );
};

export default Location;
