interface IAddBoardGroup {
  title: string;
  className: string;
  placeholder: string;
  onClick?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const AddBoard: React.FC<IAddBoardGroup> = (props) => {
  const { title, className, placeholder, onClick, onBlur } = props;
  return (
    <div className={className}>
      <input type="text" placeholder={placeholder} className="add-input" onBlur={onBlur} />
      <button className="add-column add-btn" onClick={onClick}>
        <span>&#43;</span>
        {title}
      </button>
    </div>
  );
};

export default AddBoard;
