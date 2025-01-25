import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ReminderForm = (props) => {
    const [praesidia, setPraesidia] = useState([]); 
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    
    useEffect(() => {
        const getPraesidia = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    // console.log('Get the praesidia');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/praesidium/praesidium", config); 
                    // console.log('Praesidium response', response.data)
                    setPraesidia(response.data)
                } else {
                    console.log("Sign in to get praesidia paradisei")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view praesidia")
                    // setErrStatus(401); 
                } else {
                    console.error("Error fetching praesidia:", err);                    
                }
            }
        }
        getPraesidia();
    }, [])

    console.log(obj, method)
    const defaultContent = obj? obj.content: '';
    const today = new Date(); 
    const defaultDeadline = obj? obj.deadline: today.toISOString().substring(0,10);

    const [formData, setFormData] = useState({
        praesidium: praesidia[0]? praesidia[0].id : 1, 
        content: defaultContent, 
        deadline: defaultDeadline, 
        // hidden_by: obj? obj.hidden_by: [], 
        // acknowledged_by: obj? obj.acknowledged_by: [],
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const submitReminder = async (e) => {
        e.preventDefault();
        try {
            console.log('Trying to send', formData); 
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 

                    if (method==='create') {
                        const response = await axios.post("http://localhost:8000/api/praesidium/reminders/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put("http://localhost:8000/api/praesidium/reminders/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Reminder Operation Successful!"); 
                    obj ? navigate(`/reminders/${obj.id}`): navigate('/reminders')
                    
                } else {
                    console.log("Sign in to operate on reminders")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on reminders")
            } else {
                console.log("Error during operation", err)              
            }
            
        } 
    } 

    const pageTitle = method=='create' ? "Create a reminder": "Edit your reminder"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='reminder-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitReminder}>
            
                <label htmlFor="praesidium">
                    Praesidium: <select name="praesidium" id="praesidium" onChange={handleChange}>
                        
                        {praesidia.map(praesidium => 
                        obj
                        ? (
                            <option 
                                value={praesidium.id} 
                                key={praesidium.id}
                                selected={praesidium.id==obj.praesidium ? true : false}
                                >{praesidium.name}</option>
                        )
                        : (
                            <option 
                                value={praesidium.id} 
                                key={praesidium.id}
                                >{praesidium.name}</option>
                        ))}  
                    </select>
                </label><br /><br />
                <label htmlFor="content">
                    Content: 
                    <textarea 
                        name="content" id="content" 
                        cols="60" rows="5"
                        placeholder='Content'
                        onChange={handleChange}
                        >{defaultContent}</textarea>
                </label><br /><br />
                <label htmlFor="deadline">
                    Deadline: <input 
                        type="date" name='deadline' 
                        id='deadline' 
                        onChange={handleChange}
                        defaultValue={defaultDeadline}
                    />
                </label><br /><br />

                <hr />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>
                
            </form>
        </div>
    )
}


export default ReminderForm

