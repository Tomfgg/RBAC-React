import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
const host = import.meta.env.VITE_HOST

const UsersList = () => {
    const [users, setUsers] = useState(null)
    const { AuthToken } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            let response = await fetch(`${host}/users/allUsers`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${AuthToken}`
                }
            })
            if (!response.ok) navigate('/error')
            response = await response.json()
            setUsers(response)
            setLoading(false)
        }
        fetchUsers()
    }, [])

    const deleteAccount = async (id) => {
        let response = await fetch(`${host}/users/${id}`, {
            method: 'Delete',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        if (!response.ok) navigate('/error')
        response = await response.json()

        setUsers(users.filter(user => user.id !== id))
    }

    if (loading) return <Loading />

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <SingleUser theUser={user} deleteAccount={deleteAccount} />
                </li>
            ))}
        </ul>
    )
}

const SingleUser = ({ theUser, deleteAccount }) => {
    const [user, setUser] = useState(theUser)
    const { AuthToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const setRole = async (role, id) => {
        const newRole = role === 'Admin' ? 'user' : 'admin'
        let response = await fetch(`${host}/users/${id}/${newRole}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        if (!response.ok) navigate('/error')
        response = await response.json()
        setUser({ ...user, role: response })
    }

    return (
        <div className="mx-auto my-4 p-4 max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-gray-800">{user.userName}</div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setRole(user.role, user.id)}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {user.role === 'Admin' ? 'Set as User' : 'Set as Admin'}
                    </button>
                    <button
                        onClick={() => deleteAccount(user.id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersList