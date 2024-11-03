import c from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={c.button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
