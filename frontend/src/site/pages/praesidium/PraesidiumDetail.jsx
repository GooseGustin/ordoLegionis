import { useLoaderData, useNavigate, NavLink, Link } from "react-router-dom"
import axios from "axios";

const BASEURL = "http://localhost:8000/api/";

const PraesidiumDetail = () => {
    const [praesidium, meetings] = useLoaderData(); 
    const loc = "In praesidium detail"; 

    console.log(loc, praesidium, meetings);
    
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

    return (
        <div>
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='meeting/create'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                        </span>
                        <span className="description"> <i className="fa-solid fa-right-from-bracket fa-lg"></i> New Meeting</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                        </span>
                        <span className="description">Current Report</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon"><i className="bi bi-bell"></i></span>
                        <span className="description">New Report</span>
                    </NavLink>
                    <NavLink className="nav-link" to='edit'>
                        <span className="icon"><i className="bi bi-bell"></i></span>
                        <span className="description">Edit Details</span>
                    </NavLink>

                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>
            <div className="praesidium-details main-content">
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
            {/* <nav className="navbar">
                <ul className="row">
                    <li className="col-4 me-3"><Link to='edit'>Edit</Link></li>
                    <li className="col-4"><a onClick={deletePraesidium}>Delete</a></li>
                </ul>
            </nav> */}
        </div>
    )
}

export default PraesidiumDetail


export const praesidiumLoader = async ({ params }) => {
    const {pid} = params;
    // return the praesidiumObj, list of meeting numbers and dates
    const loc = "In the praesidium loader fxn";
    let meetings = []; 
    let praesidium; 

    console.log(loc); 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            console.log(loc, pid); 
            const praesidiumResponse = await axios.get(BASEURL+ `praesidium/praesidium/${pid}`, config);
            const praesId = pid; 
            const meetingsResponse = await axios.get(BASEURL + `meetings/meetings/?pid=${praesId}`, config); 
            
            meetings = meetingsResponse.data; 
            praesidium = praesidiumResponse.data; 

            // Extract the curia ID from the praesidium data
            const curiaId = praesidium.curia;
            console.log(loc, 'curia id', curiaId); 

            // Fetch the curia details using the ID
            if (curiaId) {
                console.log('Fetching curia details...');
                const curiaResponse = await axios.get(BASEURL + `curia/curia/${curiaId}`, config);
                const curiaData = curiaResponse.data;
                console.log('Legionary response:', curiaData);

                // Add the curia details to the praesidium data
                praesidium.curiaDetails = curiaData;
            }

        } else {
            console.log("Sign in to get workLists")
        }

    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching workLists or praesidium:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        return [praesidium, meetings]; 
    }

}