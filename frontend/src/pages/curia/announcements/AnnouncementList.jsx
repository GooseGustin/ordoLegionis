import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const PostList = () => {
    const [announcements, setAnnouncements] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the announcements');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/curia/announcements", config); 
                    console.log('Post response', response.data)
                    setAnnouncements(response.data)
                } else {
                    console.log("Sign in to get announcements")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view announcements")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching announcements:", err);                    
                }
            }
        }
        getAnnouncements();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view announcements.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="announcement-list">
            {announcements.map(announcement => 
            (
                <Link to={announcement.id.toString()} key={announcement.id}>
                    <p>{announcement.title}</p>
                </Link>
            ))}  
        </div>
    )
}

export default PostList
