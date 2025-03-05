import axios from 'axios';
import React, { useState } from 'react'
import { Link, NavLink, useLoaderData, useNavigate } from 'react-router-dom';

const BASEURL = "http://localhost:8000/api/";

const ReminderForm = (props) => {
    const navigate = useNavigate(); 
    const { method } = props; 
    const [reminderObj, praesidium] = useLoaderData(); 

    const qualifiedToDelete = true;
    const creating = method=='create';

    // const [title, setTitle] = useState(); 

    console.log("in reminder form", reminderObj); 
    // console.log('praesidium', praesidium)
    if (praesidium) {
        console.log(praesidium.name)
    }
    const defaultDeadline = reminderObj? reminderObj.deadline: null;
    const defaultContent = reminderObj? reminderObj.content : '';
    const [formData, setFormData] = useState({
        praesidium: praesidium.id,
        creator_name: praesidium.name, 
        deadine: defaultDeadline, 
        content: defaultContent, 
    })

    const handleChange = (e) => {
        const targetName = e.target.name; 
        const value = e.target.value; 
        setFormData({
            ...formData, 
            [targetName]: value
        }); 
        console.log(targetName, value, formData)
    }

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the reminder');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete(BASEURL+"praesidium/reminders/"+reminderObj.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate('../../')
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

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            console.log('Trying to send', formData); 
            console.log('reminderObj', reminderObj)
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`, 
                        }
                    }; 

                    const formDataToSend = new FormData();

                    // Append form fields conditionally
                    for (const key in formData) {
                        if (key === "image") {
                            if (formData[key] instanceof File) {  // Only append if it's a new file
                                formDataToSend.append(key, formData[key]);
                            }
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    }

                    let reminderResponse;
                    if (method==='create') {
                        reminderResponse = await axios.post(`${BASEURL}praesidium/reminders/`, formDataToSend, config);
                        console.log("Success!", reminderResponse.data) 
                    } else if (method==='edit') {
                        reminderResponse = await axios.put(`${BASEURL}praesidium/reminders/${reminderObj.id}/`, formDataToSend, config);
                        console.log("Success!", reminderResponse.data) 
                    } 
    
                    console.log("Reminder Operation Successful!"); 
                    reminderObj ? navigate(`../`): navigate(`../${reminderResponse.data.id}`)
                    
                } else {
                    console.log("Sign in to operate on reminders")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on reminders")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        


    return (
        <div className='create-work'>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                <NavLink className="nav-link" to={creating ? '../../': '../../../'}>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Praesidium</span>
                </NavLink>
                <NavLink className="nav-link" to={creating ? '../': '../../'}>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Reminders</span>
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
        <div className="main-content">
            
        <h2>Create a new reminder</h2>
        <form onSubmit={handleSubmitForm}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="deadline">
                        <span className="me-1">Deadline</span>
                        <input 
                            type="date" name="deadline" id="" 
                            className="form-control border border-dark rounded rounded-3"
                            onChange={handleChange}
                            defaultValue={defaultDeadline}
                        />
                    </label>
                </div>
            </div>

            <div className="row mt-3 ">
                <label htmlFor="content">
                    <textarea 
                        name="content" id="" 
                        rows="10"
                        className='form-control border border-dark rounded rounded-3'
                        placeholder='Content'
                        onChange={handleChange}
                        defaultValue={defaultContent}
                    ></textarea>
                </label>
            </div>
                
            
            <div className="row mt-3">
                <div className="col">
                    <button type="submit" className="btn btn-outline-success col-12 rounded rounded-5">Save</button>
                </div>
                <div className="col">
                    <Link to="../" className="btn btn-outline-primary col-12 rounded rounded-5">Cancel</Link>
                </div>
                {
                    (qualifiedToDelete && method=='edit')
                    ? <div className="col">
                        <Link 
                            to='' 
                            className='btn btn-outline-danger col-12 rounded rounded-5'
                            onClick={handleDelete}
                        >Delete</Link>
                    </div>
                    : <></>
                }
            </div>
        </form>
        </div>

        </div>
    )
}

export default ReminderForm


export const reminderFormLoader = async ({ params }) => {
    const { pid, id } = params; // id of reminder for edit 
    console.log('In reminder form loader, pid, id', pid, id); 
    
    let praesidium, obj; 
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            if (pid) {

                const praesidiumResponse = await axios.get(BASEURL + `praesidium/praesidium/${pid}`, config);
                praesidium = praesidiumResponse.data; 

                if (id) {

                    const response = await axios.get(BASEURL + `praesidium/reminders/${id}`, config);
                    obj = response.data; 
                    console.log('In reminder form loader, reminder', obj);
                }

        }  else {
            console.log("Sign in to get reminders")
        }
    }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view praesidia")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching praesidium:", err);
        }
    } finally {
        // console.log('Finally', obj, praesidium)
        return [obj, praesidium];

    }
}

