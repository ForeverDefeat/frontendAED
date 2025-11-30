import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  ReceiptPercentIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

// 🔥 Hook para animar números (contador suave)
const useCounter = (targetValue, duration = 800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(targetValue) || 0;
    if (start === end) return;

    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setValue(Number(start.toFixed(0)));
    }, 16);

    return () => clearInterval(counter);
  }, [targetValue]);

  return value;
};

// TARJETA INDIVIDUAL
const KPICard = ({ title, value, hint, icon: Icon, colorClass }) => {
  const animatedValue = isNaN(Number(value))
    ? value
    : useCounter(Number(value));

  return (
    <div className="bg-white border rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-200 flex items-start gap-4 select-none">
      {/* Icono */}
      <div
        className={`rounded-xl p-3 ${colorClass} text-white flex items-center justify-center shadow-md`}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>

        {/* Valor con animación */}
        <span className="text-2xl font-bold text-gray-900">
          {typeof value === "string" && value.includes("S/")
            ? `S/ ${animatedValue}`
            : animatedValue}
        </span>

        {hint && <span className="text-xs text-gray-400 mt-1">{hint}</span>}
      </div>
    </div>
  );
};

// GRUPO DE TARJETAS
const KPICards = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      <KPICard
        title="Total Sales"
        value={kpis.totalSales.replace("S/ ", "")}
        hint="Ventas del período"
        icon={ChartBarIcon}
        colorClass="bg-blue-600"
      />

      <KPICard
        title="Products Sold"
        value={kpis.productsSold}
        hint="Unidades vendidas"
        icon={ShoppingBagIcon}
        colorClass="bg-green-600"
      />

      <KPICard
        title="Transactions"
        value={kpis.transactions}
        hint="Número de transacciones"
        icon={ReceiptPercentIcon}
        colorClass="bg-indigo-600"
      />

      <KPICard
        title="Best Seller"
        value={kpis.bestSeller === "-" ? "-" : kpis.bestSeller}
        hint={`${kpis.lowStockAlerts} alertas de stock`}
        icon={StarIcon}
        colorClass="bg-yellow-500"
      />
    </div>
  );
};

export default KPICards;