import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg max-w-lg">
                <h1 className="text-5xl font-extrabold text-red-600 mb-4">500</h1>
                <p className="text-xl text-gray-700 mb-6">Oops! Something went wrong.</p>
                <p className="text-md text-gray-600 mb-6">Please try again later or return to the homepage.</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
