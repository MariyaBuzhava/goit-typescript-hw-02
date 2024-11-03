import axios from "axios";
import { ApiResponse } from "../components/App/App.types";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (
  query: string,
  page: number = 0,
  perPage: number = 15
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/search/photos`, {
    params: {
      client_id: "DANKlgAbccLybPfVyNlkfj3soumKRCnnLisBk1-go5g",
      query: query,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};
