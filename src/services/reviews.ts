import api from "./api";

export const getReviews = async (productId: number) => {
  const response = await api.get(`/produtos/${productId}/avaliacoes`);
  return response.data;
};

export const createReview = async (productId: number, data: any) => {
  const response = await api.post(`/produtos/${productId}/avaliacoes`, data);
  return response.data;
};
