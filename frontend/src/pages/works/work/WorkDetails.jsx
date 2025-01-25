import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const WorkDetails = () => {
    const work = useLoaderData(); 
    console.log("in details", work)
    const meetingNo = work.meetingDetails.meeting_no; 
    // let deadline = work.deadline;
    // if (work.deadline == '1777-01-01') {
    //     deadline = null; 
    // } 

    const navigate = useNavigate(); 

    const deleteWork = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the work');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/works/work/"+work.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the work")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this work")
            } else {
                console.error("Error deleting the work:", err);
            }
        }
    }
    
    if (!work) {
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
            <div className="work-details">
                <p>Meeting: {meetingNo}</p>                
                <p>Date: {work.meetingDetails.date}</p>
                <p>Work type: {work.type}</p>
                <p>Active: {work.active? "True": "False"}</p>
                <p>Done: {work.done? "Done": "Undone"}</p>
                {/* <p>Details: {work.details}</p> */}
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteWork}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default WorkDetails

// loader function 
export const workDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the work');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const workResponse = await axios.get("http://127.0.0.1:8000/api/works/work/" + id, config); 
            const workData = workResponse.data;
            // console.log('Question response:', workData);

            // Extract the meeting ID from the work data
            const meetingId = workData.meeting;

            // Fetch the meeting details using the ID
            if (meetingId) {
                // console.log('Fetching meeting details...');
                const meetingResponse = await axios.get(`http://127.0.0.1:8000/api/meetings/meetings/${meetingId}`, config);
                const meetingData = meetingResponse.data;
                // console.log('Curia response:', meetingData);

                // Add the meeting details to the work data
                workData.meetingDetails = meetingData;
                return workData; 
            } else {
                console.warn('No meeting ID found in the work data');
            }
            return workData; 
        } else {
            console.log("Sign in to get the work")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on works")
        } else {
            console.error("Error fetching the work:", err);          
        }
    }
}

                    
                    