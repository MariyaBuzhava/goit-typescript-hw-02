interface Image {
  id: string;
  urls: {
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

interface User {
  name: string;
  profileUrl: string;
}

interface ApiResponse {
  results: Image[];
  total_pages: number;
}
