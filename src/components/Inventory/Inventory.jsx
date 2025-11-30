import React, { useEffect, useState } from "react";
import {
    getProducts,
    getCategories,
    addProduct,
    updateProduct,
    deleteProduct,
} from "./api";

import ProductRow from "./ProductRow";
import ProductForm from "./ProductForm";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

import {
    CubeIcon,
    Squares2X2Icon,
    ArchiveBoxIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // PARA EDITAR
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // PARA ELIMINAR
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleSaveChanges = async (updatedProduct) => {
        await updateProduct(updatedProduct.id_producto, updatedProduct);
        setEditModalOpen(false);
        fetchProducts();
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;
        await deleteProduct(productToDelete.id_producto);
        setDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts();
    };

    // MÉTRICAS PARA KPI CARDS
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = products.filter((p) => p.stock <= p.stock_minimo).length;

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-6 text-gray-900">Inventario</h2>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-xl text-white shadow">
                        <CubeIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Productos Totales</p>
                        <p className="text-2xl font-bold">{totalProducts}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
                    <div className="bg-green-600 p-3 rounded-xl text-white shadow">
                        <ArchiveBoxIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Stock Total</p>
                        <p className="text-2xl font-bold">{totalStock}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-xl text-white shadow">
                        <Squares2X2Icon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Categorías</p>
                        <p className="text-2xl font-bold">{categories.length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
                    <div className="bg-yellow-500 p-3 rounded-xl text-white shadow">
                        <ExclamationTriangleIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Stock Crítico</p>
                        <p className="text-2xl font-bold">{lowStockCount}</p>
                    </div>
                </div>
            </div>

            {/* FORMULARIO DE AGREGAR PRODUCTO */}
            <ProductForm
                categories={categories}
                onSubmit={async (data) => {
                    await addProduct(data);
                    fetchProducts();
                }}
            />

            {/* TABLA */}
            <div className="w-full overflow-x-auto mt-6 rounded-lg shadow bg-white">
                <table className="min-w-full text-sm border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Nombre</th>
                            <th className="px-4 py-3 text-left">Categoría</th>
                            <th className="px-4 py-3 text-left">Descripción</th>
                            <th className="px-4 py-3 text-left">Stock</th>
                            <th className="px-4 py-3 text-left">Precio Compra</th>
                            <th className="px-4 py-3 text-left">Precio Venta</th>
                            <th className="px-4 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((prod) => (
                            <ProductRow
                                key={prod.id_producto}
                                product={prod}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL EDITAR */}
            <EditModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                product={selectedProduct}
                onSave={handleSaveChanges}
            />

            {/* MODAL ELIMINAR */}
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                product={productToDelete}
            />
        </div>
    );
};

export default Inventory;