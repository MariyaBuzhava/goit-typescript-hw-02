import ReactModal from "react-modal";

import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import ImageGallery from "../ImageGallery/ImageGallery.js";
import { fetchImages } from "../../services/images-api.js";
import Loader from "../Loader/Loader.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js";
import ImageModal from "../ImageModal/ImageModal.js";
import toast, { Toaster } from "react-hot-toast";
import { ApiResponse, Image, User } from "./App.types";

ReactModal.setAppElement("#root");

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [altDescription, setAltDescription] = useState<string>("");

  useEffect(() => {
    if (!query) return;
    const handleSubmit = async () => {
      try {
        setError(false);
        setLoading(true);
        const data: ApiResponse = await fetchImages(query, page);

        setImages((prev) => [...prev, ...data.results]);

        setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    handleSubmit();
  }, [query, page]);

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSetQuery = (topic: string) => {
    if (topic.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    if (topic !== query) {
      setQuery(topic);
      setImages([]);
      setPage(1);
    }
  };

  const openModal = (
    imageUrl: string,
    user: User,
    likes: number,
    alt_description: string
  ) => {
    setSelectedImage(imageUrl);
    setUser(user);
    setLikes(likes);
    setAltDescription(alt_description);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <h1>Image Search</h1>
      <SearchBar onSubmit={handleSetQuery} />
      <Toaster />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={(image: Image) =>
            openModal(
              image.urls.regular,
              {
                name: image.user.name,
                profileUrl: image.user.links.html,
              },
              image.likes,
              image.alt_description
            )
          }
        />
      )}
      {loading && <Loader />}
      {!loading && page < totalPages && (
        <LoadMoreBtn onClick={handleChangePage} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageUrl={selectedImage}
          user={user}
          likes={likes}
          altDescription={altDescription}
        />
      )}
    </>
  );
}

export default App;
