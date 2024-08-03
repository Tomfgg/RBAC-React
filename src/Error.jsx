import { Link } from "react-router-dom"
// import './Error.css';
export default function Error() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg max-w-md">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6">Page not found</p>
                <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-700 font-semibold text-lg"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}