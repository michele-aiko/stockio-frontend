import api from "./api";

export const uploadImage = async (productId: number, file: File) => {
  const formData = new FormData();
  formData.append("imagem", file);

  const response = await api.post(`/produtos/${productId}/imagens`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteImage = async (imageId: number) => {
  const response = await api.delete(`/imagens/${imageId}`);
  return response.data;
};
