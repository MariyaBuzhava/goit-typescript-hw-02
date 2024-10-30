import c from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard.jsx";

const ImageGallery = ({ images, onImageClick }) => {
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
