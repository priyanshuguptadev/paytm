export const Avatar = ({ name, user}) => {
  return (
    <div className={`avatar ${user? 'avatar-online' : ''} avatar-placeholder`}>
      <div className="bg-neutral text-neutral-content w-8 rounded-full">
        <span className="text-3xl">{name.split("")[0]}</span>
      </div>
    </div>
  );
};
