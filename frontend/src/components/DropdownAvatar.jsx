import { useState } from 'react';

export const DropdownAvatar = ({name, username, balanceOnClick, logoutOnClick}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <img
        id="avatarButton"
        onClick={toggleDropdown}
        className="w-7 h-7 rounded-full cursor-pointer"
        src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" // Update this with your actual image path
        alt="User dropdown"
      />
      <div
        id="userDropdown"
        className={`absolute z-10 ${
          isOpen ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 right-8`}
      >
        <div className="px-4 py-3 text-sm text-gray-900">
          <div>{name}</div>
          <p className='text-gray-400'>{username}</p>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="avatarButton"
        >
          <li>
            <button
            onClick={balanceOnClick}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left hover:cursor-pointer"
            >
              Check Balance
            </button>
          </li>
        </ul>
        <div className="py-1">
          <button
          onClick={logoutOnClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full hover:cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
