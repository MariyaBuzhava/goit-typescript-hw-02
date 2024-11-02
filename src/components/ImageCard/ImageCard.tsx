import { Image } from "../App/App.types";
import c from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={c.imageCard} onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description || "Image"} />
    </div>
  );
};

export default ImageCard;
