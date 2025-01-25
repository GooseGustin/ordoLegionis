import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const ReminderDetails = () => {
    const reminder = useLoaderData(); 
    console.log("in details", reminder)
    const praesidiumName = reminder.praesidiumDetails.name; 
    let deadline = reminder.deadline;
    if (reminder.deadline == '1777-01-01') {
        deadline = null; 
    } 

    const navigate = useNavigate(); 

    const deleteReminder = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the reminder');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/praesidium/reminders/"+reminder.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the reminder")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this reminder")
            } else {
                console.error("Error deleting the reminder:", err);
            }
        }
    }
    
    if (!reminder) {
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
            <div className="reminder-details">
                <p>Praesidium: {praesidiumName}</p>                
                <p>{reminder.content}</p>
                <p>Deadline: {deadline}</p>
                <p>Hidden by: {reminder.hidden_by}</p>
                <p>Acknowleged by: {reminder.acknowledged_by}</p>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteReminder}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default ReminderDetails

// loader function 
export const reminderDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the reminder');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const reminderResponse = await axios.get("http://127.0.0.1:8000/api/praesidium/reminders/" + id, config); 
            const reminderData = reminderResponse.data;
            // console.log('Question response:', reminderData);

            // Extract the praesidium ID from the reminder data
            const praesidiumId = reminderData.praesidium;

            // Fetch the praesidium details using the ID
            if (praesidiumId) {
                // console.log('Fetching praesidium details...');
                const praesidiumResponse = await axios.get(`http://127.0.0.1:8000/api/praesidium/praesidium/${praesidiumId}`, config);
                const praesidiumData = praesidiumResponse.data;
                // console.log('Curia response:', praesidiumData);

                // Add the praesidium details to the reminder data
                reminderData.praesidiumDetails = praesidiumData;
                return reminderData; 
            } else {
                console.warn('No praesidium ID found in the reminder data');
            }
            return reminderData; 
        } else {
            console.log("Sign in to get the reminder")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on reminders")
        } else {
            console.error("Error fetching the reminder:", err);          
        }
    }
}

                    
                    