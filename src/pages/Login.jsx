import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      // Guardar sesión y datos del usuario
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(res.data));

      setLoading(false);
      onLogin(); // Notifica al componente App que el login fue exitoso

    } catch (err) {
      setLoading(false);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-96"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        <label className="block text-gray-700 mb-2">Correo electrónico</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-gray-700 mb-2">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-2 rounded text-white
            ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
