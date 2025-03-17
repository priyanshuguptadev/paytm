import { useState } from "react";
import { AppBar } from "../components/Appbar";
import { Search } from "../components/Search";
import { UserCard } from "../components/UserCard";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("")
  const { users, loading } = useFetchUsers({filter});
  const token = localStorage.getItem("token")
  if(!token){
    <Navigate to={'/signin'} />
  }
  <Outlet />
  return (
    <div className="flex flex-col items-center w-full">
      <AppBar />
      <div className="text-center mt-8 w-3/4">
        <div>Friends</div>
        <Search onChange={(e)=>setFilter(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} />
        {users.map((user)=><UserCard username={user.firstName} key={user._id} onClick={()=>navigate(`/send/${user._id}`)}/>)}
      </div>
    </div>
  );
};
