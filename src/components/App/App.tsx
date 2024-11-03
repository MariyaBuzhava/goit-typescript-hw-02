import ReactModal from "react-modal";
import { useState, useEffect, useCallback } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { ApiResponse, Image, User } from "./App.types";
import { fetchImages } from "../../services/images-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

ReactModal.setAppElement("#root");

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
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

  const handleChangePage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleSetQuery = useCallback(
    (topic: string) => {
      if (topic.trim() === "") {
        toast.error("Please enter a search query.");
        return;
      }
      if (topic !== query) {
        setQuery(topic);
        setImages([]);
        setPage(1);
        setTotalPages(0);
      }
    },
    [query]
  );

  const openModal = useCallback(
    (imageUrl: string, user: User, likes: number, altDescription: string) => {
      setSelectedImage(imageUrl);
      setUser(user);
      setLikes(likes);
      setAltDescription(altDescription);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedImage(null);
  }, []);

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
      {!loading && page < totalPages && images.length > 0 && (
        <LoadMoreBtn onClick={handleChangePage} />
      )}
      {selectedImage && user && (
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
