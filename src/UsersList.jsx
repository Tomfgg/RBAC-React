import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
const UsersList = () => {
    const [users, setUsers] = useState(null)
    const { AuthToken } = useContext(AuthContext)

    useEffect(() => {
        // setLoading(true);
        const fetchFriends = async () => {
            let response = await fetch('http://127.0.0.1:5000/users/allUsers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${AuthToken}`
                }
            })
            response = await response.json()
            console.log(response)
            setUsers(response)
            // setLoading(false)
        }
        fetchFriends()
    }, [])

    const deleteAccount = async (id) => {
        let response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
            method: 'Delete',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        response = await response.json()
        // console.log(response)
        setUsers(users.filter(user => user.id !== id))
    }

    if(!users ) return <div>...Loading</div>
    // if(users && ! users instanceof Array) return setUsers([users])

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

    const setRole = async (role, id) => {
        const newRole = role === 'Admin' ? 'user' : 'admin'
        let response = await fetch(`http://127.0.0.1:5000/users/${id}/${newRole}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        response = await response.json()
        console.log(response)
        setUser({...user,role:response})
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
            {/* <div className="text-gray-600">{user.role}</div> */}
        </div>
    )
}

export default UsersList