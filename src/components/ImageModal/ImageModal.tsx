import { useEffect } from "react";
import c from "./ImageModal.module.css";
import ReactModal from "react-modal";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  user: {
    name: string;
  };
  likes: number;
  altDescription?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  user,
  likes,
  altDescription,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      overlayClassName={c.modalOverlay}
    >
      <div className={c.modalBody}>
        <img src={imageUrl} alt={altDescription || "Image"} />

        <div className={c.info}>
          <p>
            <strong>Author:</strong> {user.name}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
          {altDescription && (
            <p>
              <strong>Description:</strong> {altDescription}
            </p>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
