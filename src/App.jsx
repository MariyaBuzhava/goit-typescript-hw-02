import ReactModal from "react-modal";

import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import { fetchImages } from "./services/images-api.js";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import toast, { Toaster } from "react-hot-toast";

ReactModal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(0);
  const [altDescription, setAltDescription] = useState("");

  useEffect(() => {
    if (!query) return;
    const handleSubmit = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(query, page);

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

  const handleSetQuery = (topic) => {
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

  const openModal = (imageUrl, user, likes, alt_description) => {
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
          onImageClick={(image) =>
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
