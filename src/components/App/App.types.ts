export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  likes: number;
  alt_description: string;
}

export interface User {
  name: string;
  profileUrl: string;
}

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
