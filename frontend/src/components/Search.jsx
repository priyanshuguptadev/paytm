export const Search = ({ onChange }) => {
  return (
    <input
      onChange={onChange}
      type="text"
      placeholder="Search friends..."
      className="input input-bordered w-32 md:w-auto"
    />
  );
};
