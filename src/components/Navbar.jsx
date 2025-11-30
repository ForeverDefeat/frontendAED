import React, { useState, useEffect } from "react";

const Navbar = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">Comercial Rojas S.A.C.</div>

      {/* Fecha y hora */}
      <div className="text-sm font-mono">{formatDateTime(currentTime)}</div>

      {/* Usuario */}
      <div className="flex items-center space-x-4">
        <span>{user?.nombre}</span>

        <button
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
