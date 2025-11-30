import React, { useState } from "react";

const Filters = ({ filters, onApply, onClear }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        onApply(localFilters);
    };

    const clearFilters = () => {
        setLocalFilters({
            from: "",
            to: "",
            category: "",
            product: "",
            employee: "",
        });
        onClear();
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border">

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold">Desde</label>
                    <input
                        type="date"
                        name="from"
                        value={localFilters.from}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">Hasta</label>
                    <input
                        type="date"
                        name="to"
                        value={localFilters.to}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">Categoría</label>
                    <select
                        name="category"
                        value={localFilters.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Todas</option>
                        <option value="1">Bebidas</option>
                        <option value="2">Snacks</option>
                        <option value="3">Lácteos</option>
                        <option value="4">Aseo Personal</option>
                    </select>
                </div>
            </div>

            {/* Producto & Empleado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold">Producto</label>
                    <input
                        type="text"
                        name="product"
                        placeholder="Nombre de producto"
                        value={localFilters.product}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">Empleado</label>
                    <input
                        type="text"
                        name="employee"
                        placeholder="Nombre del empleado"
                        value={localFilters.employee}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
                <button
                    onClick={applyFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                    Generar
                </button>

                <button
                    onClick={clearFilters}
                    className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                >
                    Limpiar
                </button>
            </div>
        </div>
    );
};

export default Filters;