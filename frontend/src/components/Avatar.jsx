export const Avatar = ({name}) => {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-green-400 rounded-full">
      <span className="font-medium text-white">{name.split("")[0]}</span>
    </div>
  );
};
