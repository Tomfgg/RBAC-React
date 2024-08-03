import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
 const PostForm = () => {
    const [content, setContent] = useState('');
     const { AuthToken } = useContext(AuthContext)

     const navigate = useNavigate()

     const handleContentChange = (e) => {
         if (e.target.value.length > 200) return
         setContent(e.target.value);
     };

     const handleSubmit = async (e) => {
         e.preventDefault();
         // Handle form submission
         const formData = {content}     
         console.log(formData)
         await fetch('http://127.0.0.1:5000/posts', {
             method: 'POST',
             headers: {
                 'Authorization': `Bearer ${AuthToken}`, 
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(formData)
         });
         setContent('')
         navigate('/')
     };

     return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
             <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md">
                 <textarea
                     value={content}
                     onChange={handleContentChange}
                     placeholder="What's on your mind?"
                     className="w-full h-32 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                 />
                 <div className="flex justify-between mt-4">
                     <button
                         onClick={() => navigate('/')}
                         className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                     >
                         Cancel
                     </button>
                     <button
                         onClick={handleSubmit}
                         disabled={!content}
                         className={`px-4 py-2 rounded-md font-semibold ${!content ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'}`}
                     >
                         Post
                     </button>
                 </div>
             </div>
         </div>
     )
}

export default PostForm