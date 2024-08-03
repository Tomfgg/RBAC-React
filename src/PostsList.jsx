import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider";
import SinglePost from "./SinglePost";
// import './PostsList.css'
// import Button from 'react-bootstrap/Button';

export default function PostsList({ }) {
    const { AuthToken } = useContext(AuthContext)
    const [posts, setPosts] = useState(null)
    // const [skip, setSkip] = useState(0)
    // const [noMorePosts, setNoMorePosts] = useState(false)
    // if (!whosePosts) whosePosts = ''
    useEffect(() => {
        async function fetchPosts() {
            let posts = await fetch(`http://127.0.0.1:5000/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${AuthToken}`,
                },
            });
            posts = await posts.json()
            console.log(posts)
            setPosts(posts)
            // if (posts.length < 5) setNoMorePosts(true)
            // setSkip(skip + 5)
        }
        fetchPosts()
    }, [])

    // console.log(noMorePosts)

    // const decrementSkip = () => {
    //     setSkip(skip - 1)
    // }

    const postsSetter = (id) => {
        const newPosts = posts.filter(post => post.id !== id)
        setPosts(newPosts)
    }

    // const importSomePosts = async () => {
    //     if (!noMorePosts) {
    //         let newPosts = await fetch(`http://127.0.0.1:5000/posts/${whosePosts}?skip=${skip}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${AuthToken}`,
    //             },
    //         });
    //         newPosts = await newPosts.json()
    //         console.log(newPosts)
    //         setPosts([...posts, ...newPosts])
    //         if (newPosts.length < 5) setNoMorePosts(true)
    //         setSkip(skip + 5)
    //     }
    // }

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
        {/* {!noMorePosts && <Button className="show-more outline-secondary" onClick={importSomePosts}>Show More</Button>} */}
    </>)
}