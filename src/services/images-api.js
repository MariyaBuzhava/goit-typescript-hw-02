import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 0, perPage = 15) => {
  const response = await axios.get(`/search/photos`, {
    params: {
      client_id: "DANKlgAbccLybPfVyNlkfj3soumKRCnnLisBk1-go5g",
      query: query,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};
