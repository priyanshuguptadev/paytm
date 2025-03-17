import { Avatar } from "./Avatar";

export const UserCard = ({ username, onClick }) => {
  return (
    <div className="flex justify-between bg-green-100 p-4 items-center mt-4 shadow-sm rounded-md">
      <div className='flex items-center'>
      <Avatar name={username}/>
        <div className='ml-2'>{username}</div>
      </div>
      <button className="px-4 py-2 bg-green-500 text-white hover:cursor-pointer rounded-full" onClick={onClick}>Pay</button>
    </div>
  );
};
