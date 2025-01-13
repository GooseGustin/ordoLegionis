import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

const QuestionDetails = () => {
    const question = useLoaderData(); 
    console.log("in details", question)
    const legUsername = question.legionaryDetails.user.username; 
    const [answer, setAnswer] = useState(''); 
    const navigate = useNavigate(); 

    const deleteQuestion = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the question');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/social/questions/"+question.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the question")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this question")
            } else {
                console.error("Error deleting the question:", err);          
            }
        }
    }

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        const formData = {
            content: answer, 
            question: question.id
        }
        console.log('Answering', answer)
        try {
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 

                    const response = await axios.post("http://localhost:8000/api/social/answers/", formData, config);
                    console.log("Success!", response) 
                    // console.log("Question Operation Successful!"); 
                    navigate('/question/'+question.id); 
                    
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
    
    if (!question) {
        return (
            <div>
                You are logged out. Please sign in to view this content.
                <br />
                <Link to="../../login">Login</Link>
            </div>
        )
    } 

    return (
        <div>
            <div className="question-details">
                <p>{question.content}</p>
                <p>{question.date}</p>
                <p>Flags: {question.flags.length}</p>
                <p>Posted by: {legUsername}</p>
            </div>
            <div className="">
                <nav className="navbar">
                    <ul>
                        <li><Link to={'edit'}>Edit</Link></li>
                        <li><a onClick={deleteQuestion}>Delete</a></li>
                    </ul>
                </nav>
            </div>
            <div className="answers">
                <hr />
                <p>Add an answer</p>
                <form onSubmit={handleSubmitAnswer}>
                    <label htmlFor="answer">
                        <textarea 
                            name="answer" 
                            id="answer" 
                            cols="60" 
                            rows="5" 
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='Type answer here...'></textarea>

                    </label><br />
                    <button type="submit">Answer</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionDetails

// loader function 

export const questionDetailsLoader = async ({ params }) => {
    const { id } = params;

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            console.log('Get the question');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            // Fetch the question details
            const questionResponse = await axios.get(`http://127.0.0.1:8000/api/social/questions/${id}`, config);
            const questionData = questionResponse.data;
            console.log('Question response:', questionData);

            // Extract the legionary ID from the question data
            const legionaryId = questionData.legionary;

            // Fetch the legionary details using the ID
            if (legionaryId) {
                console.log('Fetching legionary details...');
                const legionaryResponse = await axios.get(`http://127.0.0.1:8000/api/accounts/legionary/${legionaryId}`, config);
                const legionaryData = legionaryResponse.data;
                console.log('Legionary response:', legionaryData);

                // Add the legionary details to the question data
                questionData.legionaryDetails = legionaryData;
            } else {
                console.warn('No legionary ID found in the question data');
            }

            return questionData;
        } else {
            console.log("Sign in to get the question");
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            console.log("The session is expired. Please sign in again to operate on questions");
        } else {
            console.error("Error fetching the question or legionary details:", err);
        }
    }
};
