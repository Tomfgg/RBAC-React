import { createContext, useContext, useEffect, useState } from "react"
// import LikeButton from "./LikeButton"
// import ReactedUsers from "./ReactedUsers"
// import CommentsList from "./CommentsList"
import { AuthContext } from "./AuthProvider"
// import Owner from "./Owner"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
// import './PostComponent.css';
// import PostModal from "./PostModal"
// import InnerSinglePost from "./InnerSinglePost"
// import ReactsModal from "./ReactsModal"
// import InnerReactsModal from "./InnerReactsModal"
// import DropdownButton from "./DropdownButton"
// import CommentForm from "./CommentForm"
// import './SinglePost.css'
// import MediaCarousel from './MediaCarousel'

// export const CommentsCountContext = createContext(null)

export default function SinglePost({ post, postsSetter }) {
    const { AuthToken, currentUser } = useContext(AuthContext)
    // const [likes, setLikes] = useState(post.likes)
    // const [isLiked, setIsLiked] = useState(post.liked)
    // const [reacts, setReacts] = useState(null)
    // const [comments, setComments] = useState([])
    // const [skip, setSkip] = useState(0)
    // const [scrollDisabled, setScrollDisabled] = useState(false)
    // const [noMoreComments, setNoMoreComments] = useState(false)
    // const [id, setId] = useState(null)
    // const [symbol, setSymbol] = useState(null)
    // const [commentsCount, setCommentsCount] = useState(post.comments)
    // const [index, setIndex] = useState(0)

    // const [skip, setSkip] = useState(0)
    // const [toFetch,setToFetch] = useState(false)
    // console.log(post.user_id.image)

    // if (post.images.length > 0) {
    //     var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    //     var media = imageExtensions.some((ext) => post.images[index].toLowerCase().endsWith(ext)) ?
    //         <img className="post-image" src={post.images[index]} /> : <video className="post-image" controls>
    //             <source src={post.images[index]} type="video/mp4" />
    //             Your browser does not support the video tag.
    //         </video>
    // }

    console.log(post)
    // console.log(comments)

    // const incrementComments = () => {
    //     setCommentsCount(commentsCount + 1)
    // }

    // const decrementComments = (newCount) => {
    //     if (newCount || newCount === 0) setCommentsCount(newCount)
    //     else setCommentsCount(commentsCount - 1)
    // }

    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [isReactsModalVisible, setIsReactsModalVisible] = useState(false);

    // const handleNewComment = (addedComment) => {
    //     setComments([addedComment, ...comments])
    //     setSkip(skip + 1)
    // }

    // const openModal = async () => {
    //     let newComments = await fetch(`http://127.0.0.1:5000/comments/${post._id}?skip=${skip}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${AuthToken}`,
    //         },
    //     })
    //     if (newComments.ok) {
    //         newComments = await newComments.json()
    //         if (newComments.length < 5) setNoMoreComments(true)
    //         console.log(newComments)
    //         setComments([...newComments])
    //         if (scrollDisabled) setScrollDisabled(false)
    //         setSkip(skip + 5)
    //     }
    //     else setScrollDisabled(true)
    //     setIsModalVisible(true);
    // };

    // const getOtherComments = async () => {
    //     if (!scrollDisabled) {
    //         let otherComments = await fetch(`http://127.0.0.1:5000/comments/${post._id}?skip=${skip}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${AuthToken}`,
    //             },
    //         })
    //         if (otherComments.ok) {
    //             otherComments = await otherComments.json()
    //             if (otherComments.length < 5) setNoMoreComments(true)
    //             console.log(otherComments)
    //             setComments([...comments, ...otherComments])
    //             setSkip(skip + 5)
    //         }
    //     }
    // }

    // const closeModal = () => {
    //     setIsModalVisible(false);
    //     setSkip(0)
    //     setNoMoreComments(false)
    //     // setComments([])
    // };

    // const openReactsModal = async () => {
    //     let reacts = await fetch(`http://127.0.0.1:5000/users/Post/${post._id}`)
    //     reacts = await reacts.json()
    //     setReacts(reacts)
    //     setIsReactsModalVisible(true)
    // }

    // const closeReactsModal = () => {
    //     setIsReactsModalVisible(false)
    //     setReacts(null)
    // }

    // const showReacts = async () => {
    //     let reacts = await fetch(`http://127.0.0.1:5000/users/Post/${post._id}`)
    //     reacts = await reacts.json()
    //     setReacts(reacts)
    // }

    // const hideReacts = () => {
    //     setReacts(null)
    // }

    // const showComments = async () => {
    //     let newComments = await fetch(`http://127.0.0.1:5000/comments/${post._id}?skip=0`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${AuthToken}`,
    //         },
    //     })
    //     newComments = await newComments.json()
    //     console.log([...newComments])
    //     setComments([...newComments])
    //     // setSkip(skip + 3)
    // }

    const handleDeletePost = () => {
        fetch(`http://127.0.0.1:5000/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${AuthToken}`
            }
        })
        postsSetter(post.id)
        // decrementSkip()
    }

    // useEffect(()=>{
    //     if(toFetch) {
    //         const showReacts = async () => {
    //             let reacts = await fetch(`http://127.0.0.1:5000/users/Post/${post._id}`)
    //             reacts = await reacts.json()
    //             setReacts(reacts)
    //         }
    //         showReacts()
    //     }
    //     else {
    //         setReacts(null)
    //     }

    const canDelete = () => {
        if (currentUser.role === 'Admin' && post.user.role === 'User') return true
        if (currentUser.role === 'SuperAdmin') return true
        if (currentUser.id === post.user.id) return true
        return false
    }

    // }, [post._id])
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
