import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const AnnouncementDetails = () => {
    const announcement = useLoaderData(); 
    console.log("in details", announcement)
    const curiaName = announcement.curiaDetails.name; 
    let deadline = announcement.deadline;
    if (announcement.deadline == '1777-01-01') {
        deadline = null; 
    } 

    const navigate = useNavigate(); 

    const deleteAnnouncement = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the announcement');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/curia/announcements/"+announcement.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the announcement")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this announcement")
            } else {
                console.error("Error deleting the announcement:", err);
            }
        }
    }
    
    if (!announcement) {
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
            <div className="announcement-details">
                <h3>{announcement.title}</h3>
                <p>{announcement.body}</p>
                <p>Announced: {announcement.date}</p>
                <p>Announced by: {curiaName}</p>
                <p>Deadline: {deadline}</p>
                <p>Hidden by: {announcement.hidden_by}</p>
                <p>Acknowleged by: {announcement.acknowledged_by}</p>
                {
                    announcement.image? 
                    (<img src={announcement.image} alt="" />):
                    ''
                }
                
                {/* [
                        'id', 'curia', 'date', 
                        'deadline', 'title', 
                        'body', 'image', 
                        'hidden_by', 'acknowledged_by'
                    ] */}
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteAnnouncement}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default AnnouncementDetails

// loader function 
export const announcementDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the announcement');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const announcementResponse = await axios.get("http://127.0.0.1:8000/api/curia/announcements/" + id, config); 
            const announcementData = announcementResponse.data;
            // console.log('Question response:', announcementData);

            // Extract the curia ID from the announcement data
            const curiaId = announcementData.curia;

            // Fetch the curia details using the ID
            if (curiaId) {
                // console.log('Fetching curia details...');
                const curiaResponse = await axios.get(`http://127.0.0.1:8000/api/curia/curia/${curiaId}`, config);
                const curiaData = curiaResponse.data;
                // console.log('Curia response:', curiaData);

                // Add the curia details to the announcement data
                announcementData.curiaDetails = curiaData;
                return announcementData; 
            } else {
                console.warn('No curia ID found in the announcement data');
            }
            return announcementData; 
        } else {
            console.log("Sign in to get the announcement")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on announcements")
        } else {
            console.error("Error fetching the announcement:", err);          
        }
    }
}

                    
                    