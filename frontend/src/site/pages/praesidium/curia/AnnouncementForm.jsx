import axios from 'axios';
import React, { useState } from 'react'
import { Link, NavLink, useLoaderData, useNavigate } from 'react-router-dom';

const BASEURL = "http://localhost:8000/api/";

const AnnouncementForm = (props) => {
    const navigate = useNavigate(); 
    const { method } = props; 
    const [announcementObj, curia] = useLoaderData(); 

    const qualifiedToDelete = true;
    const creating = method=='create';

    // const [title, setTitle] = useState(); 

    console.log("in announcement form", announcementObj); 
    // console.log('curia', curia)
    if (curia) {
        console.log(curia.name)
    }
    const defaultDate = announcementObj? announcementObj.date: new Date().toISOString().split('T')[0];
    const defaultDeadline = announcementObj? announcementObj.deadline: null;
    const defaultContent = announcementObj? announcementObj.content : '';
    const defaultTitle = announcementObj? announcementObj.title : '';
    const defaultImg = announcementObj? announcementObj.image: null 
    const [formData, setFormData] = useState({
        curia: curia.id,
        date: defaultDate, 
        deadine: defaultDeadline,
        creator_name: curia.name,  
        content: defaultContent, 
        title: defaultTitle, 
        image: defaultImg 
    })

    const handleChange = (e) => {
        const targetName = e.target.name; 
        let value = e.target.value; 
        if (targetName == 'image') {
            // change value
            value = e.target.files[0];
        } 
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
                console.log('Get the announcement');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete(BASEURL+"curia/announcements/"+announcementObj.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate(creating? "../": '../../')
            }  else {
                console.log("Sign in to delete the announcement")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this announcement")
            } else {
                console.error("Error deleting the announcement:", err);
            }
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            console.log('Trying to send', formData); 
            console.log('announcementObj', announcementObj)
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`, 
                            "Content-Type": "multipart/form-data"
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

                    let announcementResponse;
                    if (method==='create') {
                        announcementResponse = await axios.post(`${BASEURL}curia/announcements/`, formDataToSend, config);
                        console.log("Success!", announcementResponse.data) 
                    } else if (method==='edit') {
                        announcementResponse = await axios.put(`${BASEURL}curia/announcements/${announcementObj.id}/`, formDataToSend, config);
                        console.log("Success!", announcementResponse.data) 
                    } 
    
                    console.log("Announcement Operation Successful!"); 
                    announcementObj ? navigate(`../`): navigate(`../${announcementResponse.data.id}`)
                    
                } else {
                    console.log("Sign in to operate on announcements")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on announcements")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        

    const pageTitle = creating ? "Create a announcement": "Edit your announcement"; 
    const btnTitle = creating ? "Create": "Edit"; 
    

    return (
        <div className='create-work'>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                <NavLink className="nav-link" to={creating ? '../../': '../../../'}>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Curia</span>
                </NavLink>
                <NavLink className="nav-link" to={creating ? '../': '../../'}>
                    <span className="icon">
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Announcements</span>
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
            
        <h2>Create a new announcement</h2>
        <form onSubmit={handleSubmitForm}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="date">
                        <span className="me-1">Date of announcement</span>
                        <input 
                            type="date" name="date" id="" 
                            className="form-control border border-dark rounded rounded-3"
                            onChange={handleChange}
                            defaultValue={defaultDate}
                        />
                    </label>
                </div>
                <div className="col-6">
                    <label htmlFor="deadline">
                        <span className="me-1">Deadline (optional)</span>
                        <input 
                            type="date" name="deadline" id="" 
                            className="form-control border border-dark rounded rounded-3"
                            onChange={handleChange}
                            defaultValue={defaultDeadline}
                        />
                    </label>
                </div>
            </div>
            <div className="row ">
                <label htmlFor="title">
                    <span>Title</span>
                    <input 
                        type="text" 
                        name="title" id="" 
                        className="form-control border border-dark rounded rounded-3"
                        onChange={handleChange}
                        defaultValue={defaultTitle}
                    />
                </label>
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

            {
                announcementObj 
                ? (
                    <div className="container">
                        <img src={announcementObj.image} alt="" />
                    </div>
                )
                : <></>
            }

            <div className="row mt-3">
                <label htmlFor="image">
                    <span className="me-4">Image</span>
                    <input 
                        type="file" name="image" id="" 
                        className='form-control border border-dark rounded rounded-3'
                        onChange={handleChange}
                    />
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

export default AnnouncementForm


export const announcementFormLoader = async ({ params }) => {
    const { cid, id } = params; // id of announcement for edit 
    console.log('In announcement form loader, cid, id', cid, id); 
    
    let curia, obj; 
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            if (cid) {

                // const cid = obj.curia; 
                const curiaResponse = await axios.get(BASEURL + `curia/curia/${cid}`, config);
                curia = curiaResponse.data; 

                if (id) {

                    const response = await axios.get(BASEURL + `curia/announcements/${id}`, config);
                    obj = response.data; 
                    console.log('In announcement form loader, announcement', obj);
                }

        }  else {
            console.log("Sign in to get announcements")
        }
    }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view praesidia")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching curia:", err);
        }
    } finally {
        // console.log('Finally', obj, curia)
        return [obj, curia];

    }
}

