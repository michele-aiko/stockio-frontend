import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o produto com ID ${id}:`, error);
    return null;
  }
};