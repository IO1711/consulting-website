import { NavLink, Outlet } from "react-router-dom";

const UserPage = () => {

    return <>
        <div className="min-h-screen bg-[#FAF9F6]">
  
  <div className="bg-[#032F2C] text-white py-12 flex flex-col items-center">
    <img src="avatar1.png" alt="User photo" className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-4"/>
    <h1 className="text-2xl font-semibold">Ozodakhon Uktamova</h1>
    <p className="text-gray-300">ozodakhon@example.com</p>
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
</div>

    </>
}

export default UserPage;

/*border-4 border-white*/