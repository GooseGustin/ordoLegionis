import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PostForm = (props) => {
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    // const [title, setTitle] = useState(); 

    console.log(obj, method)
    const [formData, setFormData] = useState({
        content: obj? obj.content:'', 
        title: obj? obj.title:'', 
        flags: []
    })
    const defaultContent = obj? obj.content : '';
    const defaultTitle = obj? obj.title : '';

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const submitPost = async (e) => {
        e.preventDefault();
        // if (isLoading) {
        //     return
        // }

        // setIsLoading(true); 

        try {
            console.log('Trying to send', formData); 
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 

                    if (method==='create') {
                        const response = await axios.post("http://localhost:8000/api/social/posts/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put("http://localhost:8000/api/social/posts/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Post Operation Successful!"); 
                    obj ? navigate(`/posts/${obj.id}`): navigate('/posts')
                    
                } else {
                    console.log("Sign in to operate on posts")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on posts")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        

    const pageTitle = method=='create' ? "Create a post": "Edit your post"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='post-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitPost}>
                <label htmlFor="title">
                    <input 
                        type="text" name='title' 
                        id='title' placeholder='Title' 
                        onChange={handleChange}
                        defaultValue={defaultTitle}
                    />
                </label><br /><br />
                <label htmlFor='content'>
                    <textarea 
                        name="content" id="content" 
                        cols="50" rows="6" 
                        placeholder='Type your post' 
                        onChange={handleChange} 
                        defaultValue={defaultContent}></textarea>
                </label><hr />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}

export default PostForm
