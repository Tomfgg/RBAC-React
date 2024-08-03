import { createContext, useContext, useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom';
const host = import.meta.env.VITE_HOST

import { AuthContext } from "./AuthProvider"


export default function SinglePost({ post, postsSetter }) {
    const { AuthToken, currentUser,logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleDeletePost = async () => {
        let response = await fetch(`${host}/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        if (!response.ok) {
            const error = await response.json()
            if (error.error === 'user not found') logout()
            else navigate('/error')
        }
        else postsSetter(post.id)
    }

    const canDelete = () => {
        if (currentUser.role === 'Admin' && post.user.role === 'User') return true
        if (currentUser.role === 'SuperAdmin') return true
        if (currentUser.id === post.user.id) return true
        return false
    }

    if (!post) return null

    return (
        <div className="w-[70%] mx-auto p-4 border rounded-md shadow-sm bg-white">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-lg font-semibold">
                        {post.user.userName}
                        {post.user.role !== 'User' && (
                            <span className="text-gray-500 text-sm ml-2">
                                ({post.user.role})
                            </span>
                        )}
                    </div>
                </div>
                {canDelete() && (
                    <button
                        onClick={handleDeletePost}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Delete
                    </button>
                )}
            </div>
            <div className="mt-2 text-gray-800">
                {post.content}
            </div>
        </div>
    );
}
