// CriticalStockTable.jsx
import React, { useEffect, useState } from "react";
import { exportToCSV, exportToPDF } from "./exportUtils";
import api from "../../api/api"; 

export default function CriticalStockTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("reports/stock-critico/")
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setProducts(json);
        else setProducts([]);
      })
      .catch((err) => console.error("Error loading critical stock:", err))
      .finally(() => setLoading(false));
  }, []);

  // ESTADO DE CARGA
  if (loading) {
    return (
      <p className="text-gray-600 animate-pulse text-sm">
        Cargando stock crítico...
      </p>
    );
  }

  // SIN DATOS
  if (!products.length) {
    return (
      <div className="text-gray-600 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        No hay productos con stock crítico.
      </div>
    );
  }

  return (
    <div className="mt-4">

      {/* BOTONES */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => exportToCSV(products, "CriticalStock.csv")}
        >
          Exportar CSV
        </button>

        <button
          className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => exportToPDF(products)}
        >
          Exportar PDF
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
        <table className="min-w-full text-sm">

          {/* CABECERA */}
          <thead className="bg-red-600 text-white">
            <tr>
              {Object.keys(products[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left font-medium uppercase tracking-wide"
                >
                  {key.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>

          {/* CUERPO */}
          <tbody>
            {products.map((prod, i) => (
              <tr
                key={i}
                className={`border-b ${
                  i % 2 === 0 ? "bg-red-50" : "bg-white"
                } hover:bg-red-100 transition`}
              >
                {Object.entries(prod).map(([key, value], j) => (
                  <td key={j} className="px-4 py-3 text-gray-900">

                    {/* Resaltar la columna Stock */}
                    {key.toLowerCase().includes("stock") && value <= 5 ? (
                      <span className="font-bold text-red-700">{value}</span>
                    ) : (
                      value
                    )}

                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
