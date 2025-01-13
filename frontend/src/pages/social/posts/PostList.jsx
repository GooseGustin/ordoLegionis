import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const PostList = () => {
    const [posts, setPosts] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the posts');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/social/posts", config); 
                    console.log('Post response', response.data)
                    setPosts(response.data)
                } else {
                    console.log("Sign in to get posts")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view posts")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching posts:", err);                    
                }
            }
        }
        getPosts();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view posts.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="post-list">
            {posts.map(post => 
            (
                <Link to={post.id.toString()} key={post.id}>
                    <p>{post.title}</p>
                </Link>
            ))}  
        </div>
    )
}

export default PostList
