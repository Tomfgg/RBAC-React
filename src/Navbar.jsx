import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
const host = import.meta.env.VITE_HOST

export default function Navbar() {
    const navigate = useNavigate()
    const { AuthToken, logout, currentUser } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const handleDeleteAccount = async () => {
        setMenuOpen(false)
        let response = await fetch(`${host}/users/${currentUser.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AuthToken}`,
            },
        });
        if (!response.ok) {
            const error = await response.json()
            if (error.error === 'user not found') logout()
            else navigate('/error')
        }
        else logout()
    }

    if (!currentUser) return null

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div>
            </div>
            <div className="relative">
                <div className="flex items-center space-x-2">
                    {currentUser.role !== 'User' && <div className="text-gray-500 text-sm font-semibold">
                        ({currentUser.role})
                    </div>}
                    <div className="text-white font-semibold">
                        {currentUser.userName}
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        ▼ 
                    </button>
                </div>

                {menuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <li className="border-b">
                            <Link onClick={() => setMenuOpen(false)} to="/postForm" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
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
                        {currentUser.role === 'SuperAdmin' && <li className="border-b">
                            <Link
                                onClick={() => setMenuOpen(false)}
                                to={'/UsersList'}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Show Users
                            </Link>
                        </li>}
                        {currentUser.role !== 'SuperAdmin' && <li className="border-b">
                            <div
                                onClick={handleDeleteAccount}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Delete Account
                            </div>
                        </li>}
                    </ul>
                )}
            </div>
        </nav>


    );
}