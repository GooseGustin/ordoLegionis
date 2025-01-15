import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AnnouncementForm = (props) => {
    const [curiae, setCuriae] = useState([]); 
    // const [errStatus, setErrStatus] = useState(); 
    const [announceImage, setAnnounceImage] = useState(null); 
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    // console.log(obj, method)

    useEffect(() => {
        const getCuriae = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    // console.log('Get the curiae');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/curia/curia", config); 
                    // console.log('Curia response', response.data)
                    setCuriae(response.data)
                } else {
                    console.log("Sign in to get curiae")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view curiae")
                    // setErrStatus(401); 
                } else {
                    console.error("Error fetching curiae:", err);                    
                }
            }
        }
        getCuriae();
    }, [])

    console.log('check 1: obj', obj)

    let defaultDeadline = null; // = obj? obj.deadline : null;
    if (obj && obj.deadline == '1777-01-01') {
        defaultDeadline = null; 
    } else if (obj) {
        defaultDeadline = obj.deadline; 
    } 
    const defaultTitle = obj? obj.title : '';
    const defaultBody = obj? obj.body : '';
    const defaultImage = obj? obj.image : null;
    
    const [formData, setFormData] = useState({
        curia: curiae[0]? curiae[0].id : 1, 
        deadline: defaultDeadline, 
        body: defaultBody, 
        title: defaultTitle, 
        image: defaultImage, 
    })
    console.log('check 2: formData', formData)
    
    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
            setAnnounceImage(e.target.files[0]); 
            // console.log("Image loaded", e.target.files[0]);
        } else {
            setFormData({
                ...formData, 
                [e.target.name]:e.target.value,
            }); 
        }
        // if ([e.target.name] == 'curia') {
        //     console.log(e.target.value)
        // }
        // const fish = announceImage ? announceImage[0]: null; 
        // console.log("After loading image", fish)
        
    }

    const submitAnnouncement = async (e) => {
        e.preventDefault();

        try {
            // console.log('Trying to send', formData); 
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`, 
                            "Content-Type": "multipart/form-data",
                        }
                    }; 

                    // Create a FormData object and append data
                    const formDataObj = new FormData();
                    formDataObj.append('curia', formData.curia);
                    formDataObj.append('deadline', formData.deadline?formData.deadline:'1777-01-01');
                    formDataObj.append('body', formData.body);
                    formDataObj.append('title', formData.title);
                    if (announceImage) {
                        formDataObj.append('image', announceImage);
                    }

                    if (method==='create') {
                        const response = await axios.post(
                                "http://localhost:8000/api/curia/announcements/", 
                                formDataObj, 
                                config
                            );
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put(
                                "http://localhost:8000/api/curia/announcements/" + obj.id + "/", 
                                formDataObj, 
                                config
                            );
                        console.log("Success!", response) 
                    } 
                    console.log("Announcement Operation Successful!"); 
                    obj 
                        ? navigate(`/announcements/${obj.id}`)
                        : navigate('/announcements')
                    
                } else {
                    console.log("Sign in to operate on announcements")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on announcements")
            } else {
                console.log("Error during operation", err)              
            }
            
        }
    } 
        

    const pageTitle = method=='create' ? "Create an announcement": "Edit your announcement"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='announcement-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitAnnouncement}>
                <label htmlFor="curia">
                    <select name="curia" id="curia" onChange={handleChange}>
                        
                        {curiae.map(curia => 
                        obj
                        ? (
                            <option 
                                value={curia.id} 
                                key={curia.id}
                                selected={curia.id==obj.curia ? true : false}
                                >{curia.name}</option>
                        )
                        : (
                            <option 
                                value={curia.id} 
                                key={curia.id}
                                >{curia.name}</option>
                        ))}  
                    </select>
                </label><br /><br />
                <label htmlFor="title">
                    <input 
                        type="text" name='title' 
                        id='title' placeholder='Title' 
                        onChange={handleChange}
                        defaultValue={defaultTitle}
                    />
                </label><br /><br />
                <label htmlFor="body">
                    <textarea 
                        name="body" id="body" 
                        cols="30" rows="10"
                        placeholder='Type in content'
                        onChange={handleChange}
                        defaultValue={defaultBody}
                    ></textarea>
                </label><br /><br />
                <label htmlFor="deadline">
                    <input 
                        type="date" name='deadline' 
                        id='deadline' 
                        onChange={handleChange}
                        defaultValue={defaultDeadline}
                    />
                </label><br /><br />
                <p>Change image</p>
                {                    
                    obj && obj.image? (<img src={obj.image} />): <></>
                }
                <label htmlFor="image">
                    <input 
                        type="file" 
                        name="image" 
                        id="image" 
                        accept="image/*"
                        onChange={handleChange}/>
                </label><br /><br />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}


export default AnnouncementForm
