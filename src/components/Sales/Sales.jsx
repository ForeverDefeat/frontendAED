import React, { useState, useEffect } from "react";
import api from "../api/api";
import { exportToCSV, exportToPDF } from "../Reports/exportUtils";
import { ChartBarIcon, ShoppingCartIcon, BanknotesIcon } from "@heroicons/react/24/solid";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // KPI
  const [kpi, setKpi] = useState({
    totalSales: 0,
    transactions: 0,
    productsSold: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Obtener productos desde el backend real (Render)
    api.get("productos/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error cargando productos:", err));

    // Obtener ventas
    api.get("ventas/")
      .then((res) => {
        setSales(res.data);

      let totalSales = 0;
      let trans = res.data.length;
      let productsSum = 0;

      res.data.forEach((venta) => {
        totalSales += parseFloat(venta.total);
        productsSum += venta.detalles.reduce((acc, d) => acc + d.cantidad, 0);
      });

      setKpi({
        totalSales,
        transactions: trans,
        productsSold: productsSum,
      });
    });

    setLoading(false);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCart([]);
    setSelectedProduct("");
    setQuantity(1);
    setMessage(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0) return;

    const product = products.find((p) => p.id_producto === parseInt(selectedProduct));
    if (!product) return;

    if (quantity > product.stock) {
      setMessage({
        type: "error",
        text: `Stock insuficiente. Disponible: ${product.stock}`,
      });
      return;
    }

    const existing = cart.find((i) => i.id_producto === product.id_producto);

    if (existing) {
      if (existing.cantidad + quantity > product.stock) {
        setMessage({
          type: "error",
          text: `Stock insuficiente para este producto.`,
        });
        return;
      }
      existing.cantidad += quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, cantidad: quantity }]);
    }

    setMessage(null);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id_producto !== id));
  };

  const totalVenta = cart.reduce((acc, item) => acc + item.precio_venta * item.cantidad, 0);

  const handleSubmitSale = async () => {
    if (!cart.length) return;

    setProcessing(true);
    setMessage(null);

    try {
      const res = await api.post("ventas/registrar/", {
        usuario_id: user.id_usuario ?? 1,
        items: cart.map((i) => ({
          id_producto: i.id_producto,
          cantidad: i.cantidad,
          precio_venta: i.precio_venta,
        })),
      });

      setSales([...sales, res.data]);
      setMessage({ type: "success", text: "Venta registrada con éxito." });

      setTimeout(() => handleCloseModal(), 900);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error al registrar la venta." });
    }

    setProcessing(false);
  };

  return (
<div className="w-full min-h-screen p-10 flex flex-col items-center justify-start gap-10">
      <div className="w-full max-w-6xl">

        {/* Título */}
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Ventas</h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          
          {/* Total Ventas */}
          <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 border hover:shadow-lg transition">
            <div className="p-3 rounded-xl bg-blue-600 text-white">
              <ChartBarIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Vendido</p>
              <p className="text-2xl font-bold">S/ {kpi.totalSales.toFixed(2)}</p>
            </div>
          </div>

          {/* Transacciones */}
          <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 border hover:shadow-lg transition">
            <div className="p-3 rounded-xl bg-green-600 text-white">
              <ShoppingCartIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Transacciones</p>
              <p className="text-2xl font-bold">{kpi.transactions}</p>
            </div>
          </div>

          {/* Productos vendidos */}
          <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 border hover:shadow-lg transition">
            <div className="p-3 rounded-xl bg-yellow-500 text-white">
              <BanknotesIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Productos vendidos</p>
              <p className="text-2xl font-bold">{kpi.productsSold}</p>
            </div>
          </div>

        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={handleOpenModal}
          >
            Registrar Venta
          </button>

          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
            onClick={() => exportToCSV(sales, "SalesReport.csv")}
          >
            Export CSV
          </button>

          <button
            className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700"
            onClick={() => exportToPDF(sales)}
          >
            Export PDF
          </button>
        </div>

        {/* Tabla de Ventas */}
        <div className="bg-white rounded-xl shadow border overflow-hidden mb-20">
          <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-center">
            Resumen de Ventas
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Productos</th>
                <th className="px-4 py-2 text-left">Total (S/.)</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((s) => (
                <tr key={s.id_venta} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{s.id_venta}</td>
                  <td className="px-4 py-2">{new Date(s.fecha).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    {s.detalles.map((d) => d.producto.nombre).join(", ")}
                  </td>
                  <td className="px-4 py-2 text-green-600 font-semibold">S/ {s.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-3/4 max-w-4xl">

              <h2 className="text-xl font-bold mb-4">Registrar Venta</h2>

              {message && (
                <div className={`p-2 mb-3 text-white rounded-lg ${
                  message.type === "error" ? "bg-red-600" : "bg-green-600"
                }`}>
                  {message.text}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">

                {/* Producto */}
                <div className="flex-1 border-r pr-4">
                  <h3 className="font-semibold mb-2">Agregar Producto</h3>

                  <label>Producto</label>
                  <select
                    className="w-full border px-3 py-2 rounded mb-3"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">-- Seleccione --</option>
                    {products.map((p) => (
                      <option key={p.id_producto} value={p.id_producto}>
                        {p.nombre} (Stock: {p.stock})
                      </option>
                    ))}
                  </select>

                  <label>Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border px-3 py-2 rounded mb-3"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />

                  <button
                    className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </button>
                </div>

                {/* Carrito */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Carrito</h3>

                  {cart.length === 0 ? (
                    <p className="text-gray-600">No hay productos agregados.</p>
                  ) : (
                    <table className="w-full border text-sm mb-4">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Producto</th>
                          <th className="border px-2 py-1">Cantidad</th>
                          <th className="border px-2 py-1">Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id_producto}>
                            <td className="border px-2 py-1">{item.nombre}</td>
                            <td className="border px-2 py-1">{item.cantidad}</td>
                            <td className="border px-2 py-1">
                              S/ {(item.precio_venta * item.cantidad).toFixed(2)}
                            </td>
                            <td className="border px-2 py-1">
                              <button
                                className="bg-red-600 text-white px-2 py-1 rounded"
                                onClick={() => handleRemoveFromCart(item.id_producto)}
                              >
                                Quitar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  <div className="text-right text-lg font-bold">
                    Total: S/ {totalVenta.toFixed(2)}
                  </div>

                  <button
                    className={`mt-4 w-full py-2 rounded-lg text-white ${
                      processing ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                    }`}
                    onClick={handleSubmitSale}
                    disabled={processing || cart.length === 0}
                  >
                    {processing ? "Procesando..." : "Confirmar Venta"}
                  </button>
                </div>
              </div>

              <button
                className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Sales;
