import React, { useState, useEffect } from "react";

import api from "../../api/api";

import Filters from "./Filters";
import KPICards from "./KPICards";
import SalesReportTable from "./SalesReportTable";
import CriticalStockTable from "./CriticalSotckTable";
import UtilitiesReport from "./UtilitiesReport";
import { exportToCSV, exportToPDF } from "./exportUtils";

const Reports = () => {
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        category: "",
        product: "",
        employee: "",
    });

    const [activeTab, setActiveTab] = useState("ventas");
    const [salesData, setSalesData] = useState([]);

    const [kpis, setKpis] = useState({
        totalSales: "S/ 0.00",
        productsSold: 0,
        transactions: 0,
        bestSeller: "-",
        lowStockAlerts: 0,
    });

    useEffect(() => {
        loadSalesReport();
        loadSalesDetails();
    }, []);

    const loadSalesReport = async () => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const res = await api.get(
                `reports/ventas/?fecha=${today}`
            );

            const data = res.data;

            setKpis({
                totalSales: `S/ ${data.total_ingresos}`,
                productsSold: data.cantidad_ventas,
                transactions: data.cantidad_ventas,
                bestSeller: "-",
                lowStockAlerts: 0,
            });
        } catch (error) {
            console.log("Error cargando KPIs:", error);
        }
    };

    const loadSalesDetails = async () => {
        try {
            const res = await api.get(
                "reports/ventas/detalles/"
            );

            const mapped = res.data.ventas.map((v, index) => ({
                id: index + 1,
                date: v.fecha.split("T")[0],
                product: v.producto,
                quantity: v.cantidad,
                total: v.total,
            }));

            setSalesData(mapped);
        } catch (error) {
            console.log("Error cargando detalles:", error);
        }
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        loadSalesReport();
    };

    const handleClearFilters = () => {
        const empty = { from: "", to: "", category: "", product: "", employee: "" };
        setFilters(empty);
        loadSalesReport();
    };

    return (
        <div className="w-full p-4 md:p-6 min-h-screen">

            {/* TITULO */}
            <h1 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
                Reportes
            </h1>

            {/* FILTROS */}
            <div className="mb-6">
                <Filters
                    filters={filters}
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                />
            </div>

            {/* KPI CARDS */}
            <div className="mb-6">
                <KPICards kpis={kpis} />
            </div>

            {/* TABS */}
            <div className="flex flex-wrap border-b mb-6 gap-2">
                {[
                    { id: "ventas", label: "Informe de Ventas" },
                    { id: "utilidades", label: "Informe de Utilidades" },
                    { id: "stock", label: "Stock Crítico" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 font-semibold transition-all duration-200
                        ${
                            activeTab === tab.id
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* CONTENIDO DE TABS */}
            {activeTab === "ventas" && (
                <div className="animate-fadeIn">

                    {/* EXPORT */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded-md shadow hover:bg-green-700 transition-all"
                            onClick={() => exportToCSV(salesData, "SalesReport.csv")}
                        >
                            Exportar CSV
                        </button>

                        <button
                            className="bg-red-600 text-white px-5 py-2 rounded-md shadow hover:bg-red-700 transition-all"
                            onClick={() => exportToPDF(salesData)}
                        >
                            Exportar PDF
                        </button>
                    </div>

                    <SalesReportTable data={salesData} />
                </div>
            )}

            {activeTab === "utilidades" && (
                <div className="animate-fadeIn">
                    <UtilitiesReport />
                </div>
            )}

            {activeTab === "stock" && (
                <div className="animate-fadeIn">
                    <CriticalStockTable />
                </div>
            )}
        </div>
    );
};

export default Reports;
