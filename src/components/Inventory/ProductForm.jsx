import React, { useState, useEffect } from "react";
import { TagIcon, PencilSquareIcon, CurrencyDollarIcon, Squares2X2Icon, CubeIcon } from "@heroicons/react/24/solid";

const ProductForm = ({ categories, onSubmit, product }) => {

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio_compra: "",
    precio_venta: "",
    stock: "",
    id_categoria: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio_compra: product.precio_compra,
        precio_venta: product.precio_venta,
        stock: product.stock,
        id_categoria: product.categoria.id_categoria,
      });
    }
  }, [product]);

  // Controlador de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar datos
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      nombre: "",
      descripcion: "",
      precio_compra: "",
      precio_venta: "",
      stock: "",
      id_categoria: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Squares2X2Icon className="w-6 h-6 text-blue-600" />
        {product ? "Editar Producto" : "Agregar Nuevo Producto"}
      </h3>

      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Nombre */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <TagIcon className="w-4 h-4 text-blue-600" /> Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Coca Cola"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Squares2X2Icon className="w-4 h-4 text-purple-600" /> Categoría
          </label>
          <select
            name="id_categoria"
            value={formData.id_categoria}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 bg-white focus:ring-2 focus:ring-purple-400 outline-none"
          >
            <option value="">Seleccionar</option>
            {categories.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <PencilSquareIcon className="w-4 h-4 text-gray-600" /> Descripción
          </label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Botella PET 600ml"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-gray-300 outline-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <CubeIcon className="w-4 h-4 text-green-600" /> Stock Disponible
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Ej: 25"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Precio Compra */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <CurrencyDollarIcon className="w-4 h-4 text-yellow-600" /> Precio Compra
          </label>
          <input
            type="number"
            name="precio_compra"
            value={formData.precio_compra}
            onChange={handleChange}
            placeholder="Ej: 1.50"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Precio Venta */}
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <CurrencyDollarIcon className="w-4 h-4 text-green-600" /> Precio Venta
          </label>
          <input
            type="number"
            name="precio_venta"
            value={formData.precio_venta}
            onChange={handleChange}
            placeholder="Ej: 2.50"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>
      </div>

      {/* BOTÓN */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition-all"
        >
          {product ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;