import React from "react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function DeleteModal({ open, onClose, onConfirm, product }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-scaleIn relative">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* ICONO ALERTA */}
        <div className="flex justify-center mb-3">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
        </div>

        {/* TEXTO */}
        <h2 className="text-xl font-bold text-center text-gray-800">
          ¿Eliminar Producto?
        </h2>

        <p className="text-gray-600 mt-2 text-center">
          Estás a punto de eliminar:
          <br />
          <span className="font-semibold text-gray-800">
            {product?.nombre}
          </span>
        </p>

        {/* BOTONES */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
          >
            Eliminar
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