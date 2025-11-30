import React from "react";

// 🔥 Formato de moneda
const formatMoney = (value) => {
  return `S/ ${Number(value).toFixed(2)}`;
};

const SalesReportTable = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        
        {/* ENCABEZADO */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-5 py-3 text-left font-semibold">ID</th>
            <th className="px-5 py-3 text-left font-semibold">Fecha</th>
            <th className="px-5 py-3 text-left font-semibold">Producto</th>
            <th className="px-5 py-3 text-center font-semibold">Cantidad</th>
            <th className="px-5 py-3 text-right font-semibold">Total (S/.)</th>
          </tr>
        </thead>

        {/* CUERPO */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={`transition-all ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="px-5 py-3">{row.id}</td>
              <td className="px-5 py-3">{row.date}</td>
              <td className="px-5 py-3 font-medium text-gray-800">
                {row.product}
              </td>
              <td className="px-5 py-3 text-center">{row.quantity}</td>
              <td className="px-5 py-3 text-right font-semibold text-green-600">
                {formatMoney(row.total)}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default SalesReportTable;