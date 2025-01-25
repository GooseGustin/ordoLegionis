import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const MeetingDetails = () => {
    const meeting = useLoaderData(); 
    console.log("in details", meeting)
    const praesidiumName = meeting.praesidiumDetails.name; 
    // let deadline = meeting.deadline;
    // if (meeting.deadline == '1777-01-01') {
    //     deadline = null; 
    // } 

    const navigate = useNavigate(); 

    const deleteMeeting = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the meeting');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/meetings/meetings/"+meeting.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the meeting")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this meeting")
            } else {
                console.error("Error deleting the meeting:", err);
            }
        }
    }
    
    if (!meeting) {
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
            <div className="meeting-details">
                <p>Praesidium: {praesidiumName}</p>                
                <p>Date: {meeting.date}</p>
                <p>Meeting no.: {meeting.meeting_no}</p>
                <p>No. present: {meeting.no_present}</p>
                <p>Officers in attendance: {meeting.officers_meeting_attendance}</p>
                <p>Officers curia attendance: {meeting.officers_curia_attendance}</p>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteMeeting}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default MeetingDetails

// loader function 
export const meetingDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the meeting');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const meetingResponse = await axios.get("http://127.0.0.1:8000/api/meetings/meetings/" + id, config); 
            const meetingData = meetingResponse.data;
            // console.log('Question response:', meetingData);

            // Extract the praesidium ID from the meeting data
            const praesidiumId = meetingData.praesidium;

            // Fetch the praesidium details using the ID
            if (praesidiumId) {
                // console.log('Fetching praesidium details...');
                const praesidiumResponse = await axios.get(`http://127.0.0.1:8000/api/praesidium/praesidium/${praesidiumId}`, config);
                const praesidiumData = praesidiumResponse.data;
                // console.log('Curia response:', praesidiumData);

                // Add the praesidium details to the meeting data
                meetingData.praesidiumDetails = praesidiumData;
                return meetingData; 
            } else {
                console.warn('No praesidium ID found in the meeting data');
            }
            return meetingData; 
        } else {
            console.log("Sign in to get the meeting")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on meetings")
        } else {
            console.error("Error fetching the meeting:", err);          
        }
    }
}

                    
                    