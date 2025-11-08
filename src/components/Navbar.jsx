import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [mobMenu, setMobMenu] = useState(false);

    const mobMenuClasses = clsx(
        "fixed top-0 left-0 h-full w-[80%] bg-[#fffef8] z-50 p-4 transform transition-transform duration-500",
        {
            "-translate-x-full": !mobMenu, // hidden (off-screen to the left)
            "translate-x-0": mobMenu,      // visible (slide in) bg-[#fffef8]
        }
    );


    return <>
        <header className="-mx-[1em] box-border px-6">
        <div className="flex items-center px-2 py-8 md:p-8 text-xl">
            <div className="flex-1 flex justify-start">
                <Link to="/" className="">
                    Ozodakhon's blog
                </Link>
            </div>
            <div className="hidden flex-1 md:flex">
                    <Link to="/opportunities" className="flex-1 hoverColor">
                        Opportunities
                    </Link>
                    <Link to="/services" className="flex-1 hoverColor">
                        Services
                    </Link>
                    <Link to="/about" className="flex-1 hoverColor">
                        About the mentor
                    </Link>
            </div>
            <div className="flex-1 flex justify-end">
                <div className="flex">
                    <img src="/search.png" className="icon"/>
                    <Link to="/userpage"><img src="/user.png" className="hidden md:block icon"/></Link>
                    <img src="/hamburger.png" className="icon md:hidden scale-x-[-1] cursor-pointer" onClick={()=>setMobMenu(!mobMenu)}/>
                </div>

            </div>
        </div>
        </header>
        <div className={mobMenuClasses}>
            <div className="flex w-full">
                <div className="flex-1">

                </div>
                <div className="flex-1 flex justify-end">
                    <img src="/close.png" className="icon cursor-pointer" onClick={()=> setMobMenu(false)}/>
                </div>
            </div>

            <div className="flex flex-col p-8 text-xl">
                <Link to="/userpage" onClick={() => setMobMenu(false)} className="flex-1 p-4 flex justify-start border-b-1 hoverColor">Profile</Link>
                <Link to="/opportunities" onClick={() => setMobMenu(false)} className="flex-1 p-4 flex justify-start border-b-1 hoverColor">Opportunities</Link>
                <Link to="/services" onClick={() => setMobMenu(false)} className="flex-1 p-4 flex justify-start border-b-1 hoverColor">Services</Link>
                <Link to="/about" onClick={() => setMobMenu(false)} className="flex-1 p-4 flex justify-start border-b-1 hoverColor">About the mentor</Link>
            </div>
        </div>
    </>
}

export default Navbar;

/*
<div className="navbar-container">
            <div className="navbar-item">
                <div className="brand">
                    Ozodakhon's blog
                </div>
            </div>
            <div className="navbar-item">
                <div className="navbar-menu">
                    <div className="navbar-menu-item">
                        menu 1
                    </div>
                    <div className="navbar-menu-item">
                        menu 2
                    </div>
                    <div className="navbar-menu-item">
                        menu 3
                    </div>
                    <div className="navbar-menu-item">
                        menu 4
                    </div>
                </div>
            </div>
            <div className="navbar-item">
                <div className="icon-container">
                    <img src="/search.png" className="icon"/>
                </div>
            </div>
        </div>
*/