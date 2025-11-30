import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  XMarkIcon,
  TagIcon,
  CurrencyDollarIcon,
  CubeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";

export default function EditModal({ open, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio_compra: "",
    precio_venta: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || "",
        descripcion: product.descripcion || "",
        precio_compra: product.precio_compra || "",
        precio_venta: product.precio_venta || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({ ...product, ...formData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 animate-scaleIn relative">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <PencilSquareIcon className="w-6 h-6 text-blue-600" />
          Editar Producto
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Nombre */}
          <div>
            <label className="text-sm text-gray-600 flex gap-1">
              <TagIcon className="w-4 h-4 text-blue-600" /> Nombre
            </label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm text-gray-600 flex gap-1">
              <CubeIcon className="w-4 h-4 text-green-600" /> Stock
            </label>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Precio Compra */}
          <div>
            <label className="text-sm text-gray-600 flex gap-1">
              <CurrencyDollarIcon className="w-4 h-4 text-yellow-600" /> Precio Compra
            </label>
            <input
              name="precio_compra"
              type="number"
              value={formData.precio_compra}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Precio Venta */}
          <div>
            <label className="text-sm text-gray-600 flex gap-1">
              <CurrencyDollarIcon className="w-4 h-4 text-green-600" /> Precio Venta
            </label>
            <input
              name="precio_venta"
              type="number"
              value={formData.precio_venta}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Descripción */}
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600 flex gap-1">
              <Squares2X2Icon className="w-4 h-4 text-gray-600" /> Descripción
            </label>
            <input
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-gray-300"
            />
          </div>

        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Animaciones */}
      <style>{`
        .animate-fadeIn { animation: fadeIn .25s ease-out; }
        .animate-scaleIn { animation: scaleIn .25s ease-out; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}