import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
// import axios from 'axios';
import PostForm from './PostForm';

const PostEdit = () => {    
    const post = useLoaderData();
    console.log('In post edit', post); 

    return (
        <PostForm obj={post} method='edit' />
    )
}

export default PostEdit
