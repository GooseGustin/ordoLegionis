import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const CuriaDetails = () => {
    const curia = useLoaderData(); 
    console.log("in details", curia)
    const legUsername = curia.legionaryDetails.user.username; 

    const navigate = useNavigate(); 

    const deleteCuria = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the curia');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/curia/curia/"+curia.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the curia")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this curia")
            } else {
                console.error("Error deleting the curia:", err);
            }
        }
    }
    
    if (!curia) {
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
            <div className="curia-details">
                <h3>{curia.name}</h3>
                <p>State: {curia.state}</p>
                <p>Country: {curia.country}</p>
                <p>Parish: {curia.parish}</p>
                <p>Spiritual Director: {curia.spiritual_director}</p>
                <p>Created at: {curia.created_at}</p>
                <p>Managers: {curia.managers}</p>
                <p>Requests: {curia.management_requests}</p>
                <p>Created by: {legUsername}</p>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteCuria}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default CuriaDetails

// loader function 
export const curiaDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the curia');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const curiaResponse = await axios.get("http://127.0.0.1:8000/api/curia/curia/" + id, config); 
            const curiaData = curiaResponse.data;
            console.log('Question response:', curiaData);

            // Extract the legionary ID from the curia data
            const legionaryId = curiaData.creator;

            // Fetch the legionary details using the ID
            if (legionaryId) {
                console.log('Fetching legionary details...');
                const legionaryResponse = await axios.get(`http://127.0.0.1:8000/api/accounts/legionary/${legionaryId}`, config);
                const legionaryData = legionaryResponse.data;
                console.log('Legionary response:', legionaryData);

                // Add the legionary details to the curia data
                curiaData.legionaryDetails = legionaryData;
                return curiaData; 
            } else {
                console.warn('No legionary ID found in the curia data');
            }
        } else {
            console.log("Sign in to get the curia")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on curiae")
        } else {
            console.error("Error fetching the curia:", err);          
        }
    }
}
