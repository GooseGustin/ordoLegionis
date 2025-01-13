import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import QuestionDetails from './QuestionDetails';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the questions');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/social/questions", config); 
                    console.log('Question response', response.data)
                    setQuestions(response.data)
                } else {
                    console.log("Sign in to get questions")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view questions")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching questions:", err);                    
                }
            }
        }
        getQuestions();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view questions.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="question-list">
            {questions.map(question => 
            (
                <Link to={question.id.toString()} key={question.id}>
                    <p>{question.content}</p>
                </Link>
            ))}  
        </div>
    )
}

export default QuestionList
