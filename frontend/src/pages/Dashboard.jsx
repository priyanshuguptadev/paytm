import { useState } from "react";
import { AppBar } from "../components/Appbar";
import { UserCard } from "../components/UserCard";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const { users, loading } = useFetchUsers({ filter });
  const token = localStorage.getItem("token");
  if (!token) {
    <Navigate to={"/signin"} />;
  }
  <Outlet />;
  return (
    <div className="flex flex-col items-center w-full">
      <AppBar
        searchOnChange={(e) =>
          setFilter(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          )
        }
      />
      <ul className="list bg-base-100 rounded-box shadow-md md:w-2/3 mt-8 w-full mx-2">
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
          People you can send money to
        </li>
        {loading ? (
          <span className="loading loading-dots loading-xl mx-auto mt-4"></span>
        ) : (
          users.map((user) => (
            <UserCard
              username={user.firstName}
              key={user._id}
              onClick={() => navigate(`/send/${user._id}`)}
              userId={user._id}
            />
          ))
        )}
      </ul>
    </div>
  );
};
