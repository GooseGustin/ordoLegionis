import { useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const QuestionDetails = () => {
    const question = useLoaderData(); 
    console.log("in details", question)
    
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
            </div>
            <div className="">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><Link to={'delete'}>Delete</Link></li>
                </ul>
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
            const response = await axios.get("http://127.0.0.1:8000/api/social/questions/" + id, config); 
            console.log('Question response', response.data)
            return response.data;
        } else {
            console.log("Sign in to get the question")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on questions")
        } else {
            console.error("Error fetching the question:", err);          
        }
    }
}
