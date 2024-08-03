import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider";
import SinglePost from "./SinglePost";
import Loading from "./Loading";
import { useNavigate } from 'react-router-dom';
const host = import.meta.env.VITE_HOST


export default function PostsList({ }) {
    const { AuthToken } = useContext(AuthContext)
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchPosts() {
            let posts = await fetch(`${host}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${AuthToken}`,
                },
            });
            if (!posts.ok) navigate('/error')
            posts = await posts.json()
            setPosts(posts)
            setLoading(false)
            
        }
        fetchPosts()
    }, [])

    

    const postsSetter = (id) => {
        const newPosts = posts.filter(post => post.id !== id)
        setPosts(newPosts)
    }

   
    if (loading) return <Loading />

    return (<>
        <ul>
            {
                posts && posts.map(post => (
                    <div key={post.id} className="mt-4">
                        <SinglePost  post={post} postsSetter={postsSetter} />
                    </div>
                )
                )
            }
        </ul>
    </>)
}