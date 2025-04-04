import { useLoaderData, useNavigate, NavLink, Link } from "react-router-dom"
import axios from "axios";
import { getFormattedDate } from "../../functionVault";

const BASEURL = "http://localhost:8000/api/";


const PraesidiumDetail = () => {
    const [praesidium, meetings, isMember, isManager] = useLoaderData(); 
    const loc = "In praesidium detail"; 
    console.log(loc, praesidium, meetings);
    const curia = praesidium.curiaDetails; 

    // const navigate = useNavigate(); 

    const inaugDate = getFormattedDate(praesidium.inaug_date);
    const nextReportDeadline = getFormattedDate(praesidium.next_report_deadline); 
    const spAppDate = getFormattedDate(praesidium.spiritual_director_app_date);
    const presAppDate = getFormattedDate(praesidium.pres_app_date); 
    const vpAppDate = getFormattedDate(praesidium.vp_app_date); 
    const secAppDate = getFormattedDate(praesidium.sec_app_date); 
    const tresAppDate = getFormattedDate(praesidium.tres_app_date); 
    


    return (
        <div>
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    {
                        isMember ? 
                        <>
                        <NavLink className="nav-link" to='edit'>
                            <span className="icon">
                                <i className="bi bi-grid"></i>
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">Edit details</span>
                        </NavLink>
                        {isManager?
                        <NavLink className="nav-link" to='meeting/create'>
                            <span className="icon">
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">New meeting</span>
                        </NavLink>
                        : <></>}
                        <NavLink className="nav-link" to='meeting'>
                            <span className="icon">
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">Meetings</span>
                        </NavLink>
                        {isManager? 
                        <NavLink className="nav-link" to='reminder/create'>
                            <span className="icon">
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">New reminder</span>
                        </NavLink>
                        : <></>}
                        <NavLink className="nav-link" to='reminder'>
                            <span className="icon">
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">Reminders</span>
                        </NavLink>
                        <NavLink className="nav-link" to='report'>
                            <span className="icon">
                                <i className="bi bi-grid"></i>
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">Reports</span>
                        </NavLink>
                        {isManager?
                        <NavLink className="nav-link" to='report/create'>
                            <span className="icon">
                                <i className="bi bi-grid"></i>
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">New report</span>
                        </NavLink>
                        : <></>}
                        <NavLink className="nav-link" to='worklist'>
                            <span className="icon">
                                <i className="bi bi-grid"></i>
                                <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            </span>
                            <span className="description">Work List</span>
                        </NavLink>
                        </>
                        : 
                        <></>
                    }
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Management</span>
                    </NavLink>


                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>
            
            {/* main content */}
            <div className="main-content pt-5 text-dark">
                {/* <div className="col-10 col-md-5 col-lg-6 col-sm-10"> */}
                    <p className="fs-3 text-dark">{praesidium.name} Praesidium</p>
                {/* </div> */}

                <div className="col-10 col-md-10 col-lg-6 col-sm-10">
                    <label htmlFor="">
                        <span className="me-1 fw-bold">Inauguration date:</span>
                        <span>{inaugDate}</span>
                    </label>
                </div>

                <div className="col-10 col-md-10 col-lg-6 col-sm-10">
                    <label htmlFor="">
                        <span className="me-1 fw-bold">Next report submission:</span>
                        <span>{nextReportDeadline}</span>
                    </label>
                </div>
                
                <div className="col-10 col-md-10 col-lg-6 col-sm-10">
                    <label htmlFor="">
                        <span className="me-1 fw-bold">Curia:</span>
                        <span>{curia.name}</span>
                    </label>
                </div>

                {/* Location */}
                <div className="location border border-dark rounded rounded-3 p-3 my-2">
                    
                    <p className="fs-4 p-2 bg-secondary text-light">Location</p>

                    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                        <div className="col-5 col-md-5 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">State:</span>
                                <span>{praesidium.state}</span>
                            </label>
                        </div>
                        <div className="col-10 col-lg-6 col-md-5 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Country:</span>
                                <span>{praesidium.country}</span>
                            </label>

                        </div>
                        <div className="row col-12 col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor="praesidium">
                                <span className="me-1 fw-bold">Parish:</span>
                                <span>{praesidium.parish}</span>
                            </label>
                        </div>
                        <div className="row col-12 col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor="praesidium">
                                <span className="me-1 fw-bold">Address:</span>
                                <span>{praesidium.address}</span>
                            </label>
                        </div>
                        <div className="row col-12 col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor="praesidium">
                                <span className="me-1 fw-bold">Meeting time:</span>
                                <span>{praesidium.meeting_time}</span>
                            </label>
                        </div>
                        
                    </div> 
                </div> {/* Location */}

                {/* Officer */}
                <div className="location border border-dark rounded rounded-3 p-3 my-2">
                    
                    <p className="fs-4 p-2 bg-secondary text-light">Officers</p>

                    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Spiritual director:</span>
                                <span>{praesidium.spiritual_director}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Appointment date:</span>
                                <span>{spAppDate}</span>
                            </label>

                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">President:</span>
                                <span>{praesidium.president}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Appointment date:</span>
                                <span>{presAppDate}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Vice president:</span>
                                <span>{praesidium.vice_president}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Appointment date:</span>
                                <span>{vpAppDate}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Secretary:</span>
                                <span>{praesidium.secretary}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Appointment date:</span>
                                <span>{secAppDate}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Treasurer:</span>
                                <span>{praesidium.treasurer}</span>
                            </label>
                        </div>
                        <div className="col-5 col-md-6 col-lg-6 col-sm-10">
                            <label htmlFor="">
                                <span className="me-1 fw-bold">Appointment date:</span>
                                <span>{tresAppDate}</span>
                            </label>
                        </div>
                    </div> 
                </div> {/* Officer */}
            </div>
        </div>
    )
}

export default PraesidiumDetail

export const praesidiumLoader = async ({ params }) => {
    const {pid} = params;
    // return the praesidiumObj, list of meeting numbers and dates
    const loc = "In the praesidium loader fxn";
    let meetings = []; 
    let praesidium, legionary, isMember = false, isManager = false; 

    console.log(loc); 
    // try {
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
            console.log('Fetching curia details...');
            const curiaResponse = await axios.get(BASEURL + `curia/curia/${curiaId}`, config);

            // Add the curia details to the praesidium data
            praesidium.curiaDetails = curiaResponse.data;

            
            const legionaryResponse = await axios.get(BASEURL + 'accounts/user', config); 
            legionary = legionaryResponse.data;

            console.log(' praesidium.members',  praesidium.members, legionary.id)
            isMember = praesidium.members.includes(legionary.id)
            isManager = praesidium.managers.includes(legionary.id)
            // console.log(loc, 'legionary is a member', isMember, legionary)

        } else {
            console.log("Sign in to get workLists")
        }

        return [praesidium, meetings, isMember, isManager]; 

}

