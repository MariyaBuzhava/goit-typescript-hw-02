import { Image } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import c from "./ImageGallery.module.css";

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
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => onImageClick(image)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
