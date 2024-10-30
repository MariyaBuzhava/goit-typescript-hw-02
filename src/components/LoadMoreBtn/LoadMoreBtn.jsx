import c from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={c.button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
