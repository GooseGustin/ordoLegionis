import axios from "axios";
import { Link, NavLink, useLoaderData } from "react-router-dom"
// import Navbar from "../../components/Navbar"

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

const HomePage = () => {
    const loc = "In home page";

    const [posts, questions, requests, announcements, reminders] = useLoaderData();
    
    let elements = posts.concat(questions, requests, announcements, reminders); 
    elements = shuffle(elements); 
    console.log(loc, 'Elements', elements);

    return (
        <div className="">
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='social/post/create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">
                            New Post
                        </span>
                    </NavLink>
                    <NavLink className="nav-link" to='social/question/create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">New Question</span>
                    </NavLink>
                    <NavLink className="nav-link" to='social/request/create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">New Prayer Request</span>
                    </NavLink>

                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>

            {/* main  */}
            {
            elements[0] ? 
            <main className="main-content">
                {/* <h2>Responsive Sidebar</h2> */}
                <div className="">
                {elements.map(element => { 

                    const typeToPath = {
                        'post': 'social/post/', 
                        'question': 'social/question/', 
                        'prayer request': 'social/request/', 
                        'announcement': `curia/${element.curia}/announcement/`, 
                        'reminder': `praesidium/${element.praesidium}/reminder/`
                    }; 
                    const path = typeToPath[element.type] + element.id;
                    // console.log('element', element); 
                    return (
                    
                    <div className="card my-4 border border-2 border-primary" key={element.id + element.type}>
                        
                        <div className="card-header">
                            <NavLink className='text-dark text-decoration-none' to={path}>
                                {element.title 
                                ? (<span className="fs-5">{element.title} <span className="fs-2">|</span> </span>) 
                                : <></>}
                                <span className="text-info fs-6">{element.type} </span>
                                <span className="fs-2">|</span>
                                <span className="fs-6 text-muted text-end"> {element.creator_name}</span>      
                            </NavLink>
                        </div>
                        
                        <NavLink className='text-dark text-decoration-none' to={path}>
                            <div className="card-body post rounded border border-3 border-dark">
                                {element.content.slice(0, 120)} 
                                { element.content.length > 120? <>...</>: <></>}
                            </div>
                        </NavLink>
                    </div>
                );
                }
                )}
                </div>
            </main>
            : 
            <main className="main-content">
                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <span>You are logged out. Please login <Link to="../account/login">here</Link></span>
                        </div>
                    </div>
                </div>
            </main>
            }
        </div>
    )
}

export default HomePage


export const homeLoader = async () => {
    // Get posts, questions, prayer_requests, announcements, reminders
    let posts = []; 
    let questions = []; 
    let requests = []; 
    let announcements = []; 
    let reminders = []; 
    let praesidia = [];

    const loc = "In the home loader fxn";
    console.log(loc); 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            const postResponse = await axios.get(BASEURL + "social/posts/", config); 
            const questionResponse = await axios.get(BASEURL + "social/questions/", config); 
            const requestResponse = await axios.get(BASEURL + "social/requests/", config); 
            const announcementResponse = await axios.get(BASEURL + "curia/announcements/", config); 
            const reminderResponse = await axios.get(BASEURL + "praesidium/reminders/", config); 
            const praesidiaResponse = await axios.get(BASEURL+ "praesidium/praesidium/", config);
            
            posts = postResponse.data.map(post => {
                return {
                    ...post, type: 'post'
                };
            }); 
            questions = questionResponse.data.map(question => {
                return {
                    ...question, type: 'question'
                }; 
            }); 
            requests = requestResponse.data.map(request => {
                return {
                    ...request, type: 'request'
                }
            }); 
            announcements = announcementResponse.data.map(announcement => {
                return {
                    ...announcement, type: 'announcement'
                };
            }); 
            reminders = reminderResponse.data.map(reminder => {
                return {
                    ...reminder, type: 'reminder'
                };
            }); 
            praesidia = praesidiaResponse.data; 

        } else {
            console.log("Sign in to get workLists")
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
        return [posts, questions, requests, announcements, reminders]; 
    }
}
