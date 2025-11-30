import React, { useState } from "react";

const Sidebar = ({ setActiveSection, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa solo en móvil */}
      <div className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 md:hidden">
        <span className="font-bold text-lg"></span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-900 text-white w-64 p-6 transform
          transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        {/* Nombre usuario */}
        <div className="mb-8 hidden md:block">
          <span className="font-bold text-lg">
            {user?.nombre || "Usuario"}
          </span>
        </div>

        {/* Menú */}
        <nav className="flex flex-col space-y-4">
          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => setActiveSection("inventario")}
          >
            Inventario
          </button>

          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => setActiveSection("ventas")}
          >
            Ventas
          </button>

          <button
            className="text-left px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => setActiveSection("reportes")}
          >
            Reportes
          </button>
        </nav>
      </aside>

      {/* Fondo cuando sidebar está abierto (solo móvil) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
