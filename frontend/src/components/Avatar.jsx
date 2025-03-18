export const Avatar = ({ name, user}) => {
  return (
    // <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-green-400 rounded-full">
    //   <span className="font-medium text-white">{name.split("")[0]}</span>
    // </div>
    <div className={`avatar ${user? 'avatar-online' : ''} avatar-placeholder`}>
      <div className="bg-neutral text-neutral-content w-12 rounded-full">
        <span className="text-3xl">{name.split("")[0]}</span>
      </div>
    </div>
  );
};
