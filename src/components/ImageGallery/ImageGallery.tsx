import { Image } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import c from "./ImageGallery.module.css";
import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images || images.length === 0) {
    return <p>No images found</p>;
  }

  return (
    <div>
      <ul className={c.imageGallery}>
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ImageCard image={image} onClick={() => onImageClick(image)} />
          </motion.div>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
