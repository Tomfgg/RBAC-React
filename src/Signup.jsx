import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Signup.css'

export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords did not match');
            return;
        }
        if (formData.password.length < 5) {
            setError('Password should have at least 5 characters');
            return;
        }
        if (formData.name.length < 3 || formData.name.length > 15) {
            setError('Username should have be between 3 and 15 characters');
            return;
        }
        const nameRegex = /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/;
        if (!nameRegex.test(formData.name)) {
            setError('Invalid name');
            return;
        }

        // TODO: Implement form submission logic (e.g., send data to server)
        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error);
            }
            // if (response.error) {
            //     throw new Error('a7a'); 
            // }

            // Clear form
            setFormData({
                name: '',
                email: '',
                password: '',
            });

            setError('');
            navigate('/Login')
        }
        catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium">Username:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                    <div className="text-center text-gray-600 mt-4">
                        Already have an account? <Link to={'/login'} className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}