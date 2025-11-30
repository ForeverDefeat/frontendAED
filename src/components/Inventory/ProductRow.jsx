import React from "react";

const ProductRow = ({ product, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition">

      {/* ID */}
      <td className="px-4 py-2 text-center font-medium text-gray-700">
        {product.id_producto}
      </td>

      {/* Nombre */}
      <td className="px-4 py-2 text-gray-800">
        {product.nombre}
      </td>

      {/* Categoría */}
      <td className="px-4 py-2 text-gray-700">
        {product.categoria.nombre}
      </td>

      {/* Descripción */}
      <td className="px-4 py-2 text-gray-600">
        {product.descripcion}
      </td>

      {/* Stock */}
      <td className="px-4 py-2 text-center font-semibold text-blue-600">
        {product.stock}
      </td>

      {/* Precio Compra */}
      <td className="px-4 py-2 text-center text-gray-700">
        S/ {Number(product.precio_compra).toFixed(2)}
      </td>

      {/* Precio Venta */}
      <td className="px-4 py-2 text-center font-semibold text-green-600">
        S/ {Number(product.precio_venta).toFixed(2)}
      </td>

      {/* Acciones */}
      <td className="px-4 py-2 flex gap-2 justify-center">

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
          onClick={() => onDelete(product)}
        >
          Eliminar
        </button>

      </td>
    </tr>
  );
};

export default ProductRow;