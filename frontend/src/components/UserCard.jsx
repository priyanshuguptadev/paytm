import { Avatar } from "./Avatar";
import { SendMoneyModal } from "./SendMoneyModal";

export const UserCard = ({ username, userId }) => {
  return (
    <li className="list-row">
      <div>
        <Avatar name={username} />
      </div>
      <div>
        <div>{username}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {userId}
        </div>
      </div>
      <SendMoneyModal id={userId} />
    </li>
  );
};
