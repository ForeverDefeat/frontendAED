import api from "../../api/api"; // importa la instancia centralizada

export const getProducts = async () => {
  const response = await api.get("productos/");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("categorias/");
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post("productos/agregar_con_historial/", product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`productos/${id}/`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`productos/${id}/`);
  return response.data;
};
