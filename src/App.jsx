import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Inventory from "./components/Inventory/Inventory";
import Reports from "./components/Reports/Reports";
import Sales from "./components/Sales/Sales";
import Login from "./pages/Login";

function App() {
  const [activeSection, setActiveSection] = useState("inventario");
  const [logged, setLogged] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") setLogged(true);
  }, []);

  const handleLogin = () => {
    setLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setLogged(false); // ← IMPORTANTE
  };

  if (!logged) {
    return <Login onLogin={handleLogin} />;
  }

return (
  <div className="w-full bg-gray-100">

    {/* NAVBAR (NO DEBE AFECTAR EL ALTO DEL LAYOUT) */}
    <Navbar onLogout={handleLogout} />

    {/* CONTENEDOR PRINCIPAL — este SÍ debe medir 100vh */}
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <Sidebar setActiveSection={setActiveSection} user={user} />

      {/* CONTENIDO */}
      <main className="flex-1 p-6 bg-gray-100 ml-0 md:ml-64">
        {activeSection === "inventario" && <Inventory />}
        {activeSection === "ventas" && <Sales />}
        {activeSection === "reportes" && <Reports />}
      </main>

    </div>
  </div>
);
}

export default App;
