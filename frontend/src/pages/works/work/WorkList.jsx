import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const WorkList = () => {
    const [works, setWorks] = useState([]); 
    const [meetings, setMeetings] = useState([]);
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getWorks = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the works');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/works/work", config); 
                    console.log('Works response', response.data)
                    setWorks(response.data)
                    const response2 = await axios.get("http://localhost:8000/api/meetings/meetings", config); 
                    console.log("Meetings response", response2.data)
                    setMeetings(response2.data) 
                } else {
                    console.log("Sign in to get works")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view works")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching works or meetings:", err);                    
                }
            }
        }
        getWorks();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view works.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    const workToMeeting = (work) => {
        // meetingId = work.meeting; 
        const meet = meetings.filter(
            function (p) { return p.id === work.meeting }
            )
        console.log('In workToMeeting', meet, work.meeting, work.type);
        return meet[0]? meet[0].meeting_no : null;    
    }

    return (
        <div className="work-list">
            {works.map(work => 
            (
                <Link to={work.id.toString()} key={work.id}>
                    <p>Meeting {workToMeeting(work)} &gt;&gt; {work.type}</p>
                </Link>
            ))}  
        </div>
    )
}

export default WorkList
