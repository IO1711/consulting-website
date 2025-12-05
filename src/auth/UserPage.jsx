import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import Loader from "../utility/Loader";

const UserPage = () => {
  const token = useAuthStore((s) => s.token);
  const [user, setUser] = useState({});
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    getUserDetails();

  }, []);

  const getUserDetails = async () => {
    const response = await fetch(`${baseUrl}api/v1/getProtected/getCurrentUser`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
    setLoading(false);
    return data;
  }

  return <>
    {loading && <Loader/>}
    {!loading && <div className="min-h-screen bg-[#FAF9F6]">
    
      <div className="bg-[#032F2C] text-white py-12 flex flex-col items-center">
        <img src={user.avatar} alt="User photo" className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-4"/>
        <h1 className="text-2xl font-semibold">{`${user.firstname} ${user.lastname}`}</h1>
        <p className="text-gray-300">{user.email}</p>
        {user.role === "ADMIN" && <Link to="/adminPage">Admin</Link>}
      </div>

    
      <div className="flex justify-center space-x-6 mt-8 border-b">
        <NavLink to="" className={({isActive}) => (
            isActive ? "pb-2 border-b-2 border-[#032F2C] text-[#032F2C] font-medium defaultHover" 
            :"pb-2 text-gray-500 hover:text-[#032F2C] defaultHover")} end>
          My Courses
        </NavLink>
        <NavLink to="/userpage/requests" className={({isActive}) => (
            isActive ? "pb-2 border-b-2 border-[#032F2C] text-[#032F2C] font-medium defaultHover" 
            :"pb-2 text-gray-500 hover:text-[#032F2C] defaultHover")}>
          My Requests
        </NavLink>
      </div>

    
      <Outlet/>
    </div>}

  </>
}

export default UserPage;

/*border-4 border-white*/