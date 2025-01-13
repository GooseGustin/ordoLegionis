import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuestionForm = (props) => {
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    console.log(obj, method)
    const [formData, setFormData] = useState({
        content: obj? obj.content:'', 
        flags: []
    })
    const defaultValue = obj? obj.content : '';

    // if (obj) {
    //     setFormData({
    //         content: obj.content, 
    //         flags: obj.flags 
    //     }); 
    // }

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const createQuestion = async (e) => {
        e.preventDefault();
        // if (isLoading) {
        //     return
        // }

        // setIsLoading(true); 

        try {
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 

                    if (method==='create') {
                        const response = await axios.post("http://localhost:8000/api/social/questions/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put("http://localhost:8000/api/social/questions/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Question Operation Successful!"); 
                    navigate('/questions'); 
                    
                } else {
                    console.log("Sign in to operate on questions")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on questions")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        

    const title = method=='create' ? "Ask a question": "Edit your question"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='question-form'>
            <h2>{title}</h2>
            <hr />
            <form onSubmit={createQuestion}>
                <label htmlFor='content'>
                    <textarea name="content" id="content" cols="50" rows="6" placeholder='Type your question' onChange={handleChange} defaultValue={defaultValue}></textarea>
                </label><hr />
                <button type="submit">{btnTitle}</button>
            </form>
        </div>
    )
}

export default QuestionForm
