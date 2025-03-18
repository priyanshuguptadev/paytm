import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "./Search";
import { Avatar } from "./Avatar";
import { CheckBalanceModal } from "./CheckBalanceModal";

export const AppBar = ({searchOnChange}) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/user/username`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.firstName);
        setUserName(res.data.username);
      });
  }, []);
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">PayPaisa</a>
      </div>
      <div className="flex gap-2">
        <Search onChange={searchOnChange}/>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <Avatar name={name} user={true}/>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                <span >{userName}</span>
              </a>
            </li>
            <li>
              <CheckBalanceModal />
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
