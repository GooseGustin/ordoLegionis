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
    const loc = "In praesidia list";

    const [praesidia, curiae] = useLoaderData();
    
    let elements = praesidia.concat(curiae); 
    // elements = shuffle(elements); 
    console.log(loc, 'Elements', elements);

    // if (!elements[0]) {
    //     return (
    //         <div className="mt-5">
    //             <span className="mt-5">
    //             <Link to="../account/login" className="display-2 mt-5">Sign in</Link> to view praesidia
    //             </span>
    //         </div>
    //     )
    // }

    return (
        <div className="">
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                            <i className="bi bi-grid"></i>
                        </span>
                        <span className="description"> 
                            New Praesidium
                        </span>
                    </NavLink>
                    <NavLink className="nav-link" to='../curia/create'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">New Curia</span>
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

            {/* main  */}
            {
            elements[0]
            ? 
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
                                            <Link to={`${element.id}/meeting/create`} className="btn btn-outline-info col-12 rounded rounded-5">New Meeting</Link>
                                        </div>
                                        <div className="col">
                                            <Link to={`${element.id}/report`} className=" btn btn-outline-info col-12 rounded rounded-5">View Report</Link>
                                        </div>
                                    </div>
                                ) : (<></>)
                            }
                        </div>
                    </div>
                ))}
                
                </div> 
                </main>

            :   
            <main className="main-content">
                <div className="container my-5">
                    <div className="row ">
                            <div className="col">
                                <span>You are logged out. Please login <Link to="../account/login">here</Link> to view your praesidia</span>
                            </div>
                        </div>
                    </div>
            </main>
            }
        </div>
    )
}

export default PraesidiaList

export const praesidiaListLoader = async () => {
    // Get praesidia and curia and link to the last reports for each praesidium
    let praesidia = [];
    let curiae = []; 
    let user; 

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
            // filter by user id
            const userResponse = await axios.get(BASEURL + 'accounts/user', config); 
            user = userResponse.data;
            const curiaResponse = await axios.get(`${BASEURL}curia/curia/?uid=${user.id}`, config); 
            const praesidiaResponse = await axios.get(`${BASEURL}praesidium/praesidium/?uid=${user.id}`, config);
            
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

