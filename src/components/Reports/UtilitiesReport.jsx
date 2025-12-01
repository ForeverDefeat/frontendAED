import React, { useEffect, useState } from "react";
import { exportToCSV, exportToPDF } from "./exportUtils";
import api from "../../api/api"; 

export default function UtilitiesReport() {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("reports/utilidades/")
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setUtilities(json);
        } else if (json.results && Array.isArray(json.results)) {
          setUtilities(json.results);
        } else {
          setUtilities([]);
        }
      })
      .catch((err) => {
        console.error("Error loading utilities:", err);
        setUtilities([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-gray-600 animate-pulse text-sm">Cargando utilidades...</p>
    );

  if (!utilities.length)
    return (
      <div className="text-gray-600 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        No hay datos disponibles.
      </div>
    );

  return (
    <div className="mt-4">

      {/* BOTONES */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => exportToCSV(utilities, "UtilitiesReport.csv")}
        >
          Exportar CSV
        </button>

        <button
          className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
          onClick={() => exportToPDF(utilities)}
        >
          Exportar PDF
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              {Object.keys(utilities[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left font-medium tracking-wide uppercase"
                >
                  {key.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {utilities.map((row, i) => (
              <tr
                key={i}
                className={`border-b ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-3">
                    {typeof val === "number"
                      ? `S/ ${val.toFixed(2)}`
                      : String(val)}
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
