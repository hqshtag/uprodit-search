interface SearchInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <input
      className="keyword-input"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
