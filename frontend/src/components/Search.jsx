export const Search = ({ onChange }) => {
  return (
    <input
      onChange={onChange}
      type="text"
      placeholder="Search your friends..."
      className="input input-bordered w-24 md:w-auto"
    />
  );
};
