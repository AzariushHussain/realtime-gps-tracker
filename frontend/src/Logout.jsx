import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="px-4 py-2 text-white bg-black rounded hover:bg-bllack-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
      aria-label="Logout"
    >
      Logout
    </button>
  );
};

export default Logout;
