import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const ReminderList = () => {
    const [reminders, setReminders] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getReminders = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the reminders');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/praesidium/reminders", config); 
                    console.log('Post response', response.data)
                    setReminders(response.data)
                } else {
                    console.log("Sign in to get reminders")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view reminders")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching reminders:", err);                    
                }
            }
        }
        getReminders();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view reminders.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="reminder-list">
            {reminders.map(reminder => 
            (
                <Link to={reminder.id.toString()} key={reminder.id}>
                    <p>{reminder.content.substring(0, 50)} ...</p>
                </Link>
            ))}  
        </div>
    )
}

export default ReminderList
