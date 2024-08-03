import React, { useContext, useState } from 'react';
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css'

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // if(error) setError('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        // TODO: Implement form submission logic (e.g., send data to server)
        try {
            const response = await fetch('http://127.0.0.1:5000/users/login', {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Invalid Credentials')
            }
            // if (response.error) {
            //     throw new Error('a7a');
            // }
            const data = await response.json()
            console.log(data.token)
            login(data.token)


            // Clear form
            setFormData({
                email: '',
                password: '',
            });

            setError('');
            navigate('/')
        }
        catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign in</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                    <div className="text-center text-gray-600 mt-4">
                        Don't have an account? <Link to={'/signup'} className="text-blue-500 hover:underline">Signup</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}