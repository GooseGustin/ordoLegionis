import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const PraesidiumDetails = () => {
    const praesidium = useLoaderData(); 
    console.log("in details", praesidium)
    const curia = praesidium.curiaDetails.name; 

    const navigate = useNavigate(); 

    const deletePraesidium = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the praesidium');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/praesidium/praesidium/"+praesidium.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the praesidium")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this praesidium")
            } else {
                console.error("Error deleting the praesidium:", err);
            }
        }
    }
    
    if (!praesidium) {
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
            <div className="praesidium-details">
                <h3>{praesidium.name}</h3>
                <p>State: {praesidium.state}</p>
                <p>Country: {praesidium.country}</p>
                <p>Parish: {praesidium.parish}</p>
                <p>Curia: {curia}</p>
                <p>Address: {praesidium.address}</p>
                <p>Meeting time: {praesidium.meeting_time}</p>
                <p>Inauguration date: {praesidium.inaug_date}</p>
                <p>Spiritual Director: {praesidium.curiaDetails.spiritual_director}</p>
                <p>President: {praesidium.president}</p>
                <p>President inauguration date: {praesidium.pres_app_date}</p>
                <p>Vice president: {praesidium.vice_president}</p>                
                <p>Vice president inauguration date: {praesidium.vp_app_date}</p>
                <p>Secretary: {praesidium.secretary}</p>
                <p>Secretary inauguration date: {praesidium.sec_app_date}</p>
                <p>Treasurer: {praesidium.treasurer}</p>
                <p>Treasurer inauguration date: {praesidium.tres_app_date}</p>
                
                <p>Created at: {praesidium.created_at}</p>
                <p>Managers: {praesidium.managers}</p>
                <p>Members: {praesidium.members}</p>
                <p>Next report due: {praesidium.next_report_deadline}</p>
                
                

            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deletePraesidium}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default PraesidiumDetails

// loader function 
export const praesidiumDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the praesidium');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const praesidiumResponse = await axios.get("http://127.0.0.1:8000/api/praesidium/praesidium/" + id, config); 
            const praesidiumData = praesidiumResponse.data;
            console.log('Praesidium response:', praesidiumData);

            // Extract the curia ID from the praesidium data
            const curiaId = praesidiumData.curia;

            // Fetch the curia details using the ID
            if (curiaId) {
                console.log('Fetching curia details...');
                const curiaResponse = await axios.get(`http://127.0.0.1:8000/api/curia/curia/${curiaId}`, config);
                const curiaData = curiaResponse.data;
                console.log('Legionary response:', curiaData);

                // Add the curia details to the praesidium data
                praesidiumData.curiaDetails = curiaData;
                return praesidiumData; 
            } else {
                console.warn('No curia ID found in the praesidium data');
            }
        } else {
            console.log("Sign in to get the praesidium")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on praesidia")
        } else {
            console.error("Error fetching the praesidium:", err);          
        }
    }
}
