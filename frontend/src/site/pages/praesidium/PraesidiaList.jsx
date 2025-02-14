import axios from "axios";
import { Link, NavLink, useLoaderData } from "react-router-dom"
import Navbar from "../../components/Navbar"

const BASEURL = "http://localhost:8000/api/"; 

const shuffle = function (list) {
    // For each element in the array, swap with a randomly chosen lower element
    var len = list.length;
    for (var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1)), temp; // Random number
        temp = list[i], list[i] = list[r], list[r] = temp; // Swap
    }
    return list;
};

const PraesidiaList = () => {
    const loc = "In praesidiaList page";

    const [praesidia, curiae] = useLoaderData();
    
    let elements = praesidia.concat(curiae); 
    // elements = shuffle(elements); 
    console.log(loc, 'Elements', elements);

    return (
        <div className="">
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='post/create'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                        </span>
                        <span className="description"> <i className="fa-solid fa-right-from-bracket fa-lg"></i> New Praesidium</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                        </span>
                        <span className="description">New Curia</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon"><i className="bi bi-bell"></i></span>
                        <span className="description">New Prayer Request</span>
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

            {/* main  */}
            <main className="main-content">
                {/* <h2>Responsive Sidebar</h2> */}
                <div className="">
                {elements.map(element => (
                    <div className="card my-2 border-0" key={element.id + element.type}>
                        <div className="card-header">
                            <span className="text-primary">{element.type} | </span>
                            <span className="text-muted">{element.iden} </span>      
                        </div>
                        <div className="card-body post rounded border border-3 border-dark">
                            <div className="row h3">
                                <Link className="text-decoration-none text-dark" to={
                                    (element.type === 'praesidium')? 
                                    `${element.id}`: `../curia/${element.id}`
                                }>{element.name}</Link>
                            </div>
                            {
                                element.type === 'praesidium'? 
                                (
                                    <div className="row meeting-and-report">
                                        <div className="col">
                                            <Link to={`${element.id}/meeting/create`}>New Meeting</Link>
                                        </div>
                                        <div className="col">
                                            <Link>View Report</Link>
                                        </div>
                                    </div>
                                ) : (<></>)
                            }
                        </div>
                    </div>
                ))}
                </div>
            </main>
        </div>
    )
}

export default PraesidiaList

export const praesidiaListLoader = async () => {
    // Get praesidia and curia and link to the last reports for each praesidium
    let praesidia = [];
    let curiae = []; 

    const loc = "In the praesidiaList loader fxn";
    console.log(loc); 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            const curiaResponse = await axios.get(BASEURL + "curia/curia/", config); 
            const praesidiaResponse = await axios.get(BASEURL+ "praesidium/praesidium/", config);
            
            curiae = curiaResponse.data.map(curia => {
                return {...curia, type: 'curia'};
            }); 
            praesidia = praesidiaResponse.data.map(praesidium => {
                return {...praesidium, type: 'praesidium'};
            }); 

        } else {
            console.log("Sign in to get curia")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching workLists or praesidia:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        return [praesidia, curiae]; 
    }
}

