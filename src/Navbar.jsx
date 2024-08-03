import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


export default function Navbar() {
    const { AuthToken, logout, currentUser } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    if(!currentUser) return null

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            {/* Left side of the navbar (if needed) */}
            <div>
                {/* Any content you want to place on the left side */}
            </div>

            {/* Right side of the navbar */}
            <div className="relative">
                <div className="flex items-center space-x-2">
                    <div className="text-white font-semibold">
                        {currentUser.userName}
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        ▼ {/* Replace with an icon if needed */}
                    </button>
                </div>

                {menuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <li className="border-b">
                            <Link onClick={()=>setMenuOpen(false)} to="/postForm" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                AddPost
                            </Link>
                        </li>
                        <li className="border-b">
                            <div
                                onClick={logout}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Signout
                            </div>
                        </li>
                        {currentUser.role === 'SuperAdmin'&&<li className="border-b">
                            <Link
                                onClick={() => setMenuOpen(false)}
                                to={'/UsersList'}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Show Users
                            </Link>
                        </li>}
                    </ul>
                )}
            </div>
        </nav>


    );
}