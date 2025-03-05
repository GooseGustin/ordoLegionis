import { NavLink, useLoaderData } from "react-router-dom"
import axios from "axios";

const BASEURL = "http://localhost:8000/api/"

const CuriaDetail = () => {
    const [curia, praesidia] = useLoaderData();
    const loc= "In curia details"; 
    console.log(loc, 'curia', curia); 

    return (
        <div>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                <NavLink className="nav-link" to='edit'>
                    <span className="icon">
                        <i className="bi bi-grid"></i>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Edit</span>
                </NavLink>
                <NavLink className="nav-link" to='announcement/create'>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">New announcement</span>
                </NavLink>
                <NavLink className="nav-link" to='announcement/'>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Announcements</span>
                </NavLink>
                <NavLink className="nav-link" to='../../praesidium'>
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
        <div className="main-content pt-5">
            <p className="fs-3 text-dark">{curia.name} Curia</p>  

            {/* Location */}
            <div className="location border border-dark rounded rounded-3 p-3 my-2">
                
                <p className="fs-4 p-2 bg-secondary text-light">Location</p>

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                    <div className="col-5 col-md-5 col-lg-6 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1 fw-bold">State:</span>
                            <span>{curia.state}</span>
                        </label>
                    </div>
                    <div className="col-10 col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1 fw-bold">Country:</span>
                            <span>{curia.country}</span>
                        </label>

                    </div>
                    <div className="row col-10 col-lg-10 col-md-10 col-sm-10">
                        <label htmlFor="curia">
                            <span className="me-1 fw-bold">Parish:</span>
                            <span>{curia.parish}</span>
                        </label>
                    </div>
                    
                </div> 
            </div> {/* Location */}

            {/* Officer */}
            <div className="location border border-dark rounded rounded-3 p-3 my-2">
                
                <p className="fs-4 p-2 bg-secondary text-light">Spiritual Director</p>

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                    <div className="col-5 col-md-5 col-lg-6 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1 fw-bold">Spiritual director:</span>
                            <span>{curia.spiritual_director}</span>
                        </label>
                    </div>
                    <div className="col-10 col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1 fw-bold">Appointment date:</span>
                            <span>{curia.spiritual_director_app_date}</span>
                        </label>

                    </div>
                </div> 
            </div> {/* Officer */}

            <div className="praesidia border border-dark rounded rounded-3 p-3 my-2">
                <p className="fs-4 p-2 bg-secondary text-light">Praesidia</p>
                <div className="row">
                    {
                        praesidia.map(item => {
                            return (
                                <div className="col">
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default CuriaDetail


export const curiaDetailLoader = async ({ params }) => {
    const {cid} = params;
    // return the curiaObj, list of meeting numbers and dates
    const loc = "In the curia loader fxn";
    let curia, praesidia; 

    console.log(loc); 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            console.log(loc, cid); 
            const curiaResponse = await axios.get(BASEURL+ `curia/curia/${cid}/`, config);
            curia = curiaResponse.data; 

            
            const praesidiaResponse = await axios.get(BASEURL + `praesidium/praesidium/?cid=${cid}`, config);
            praesidia = praesidiaResponse.data; 

            // Extract the curia ID from the curia data
            const curiaId = curia.id;
            console.log(loc, 'curia id', curiaId); 

        } else {
            console.log("Sign in to get workLists")
        }

    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching workLists or curia:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        return [curia, praesidia]; 
    }

}
