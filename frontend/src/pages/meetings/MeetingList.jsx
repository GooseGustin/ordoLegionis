import React, { useState } from 'react'
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom'

const MeetingList = () => {
    const [meetings, praesidia, errStatus] = useLoaderData(); 

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view meetings.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    const meetingToPraesidium = (meeting) => {
        const praes = praesidia.filter(
            function (p) { return p.id === meeting.praesidium }
            )
        console.log('In meetingToPraesidium', praes, meeting.praesidium, meeting.meeting_no);
        return praes[0]? praes[0].name : null;    
    }

    return (
        <div className="meeting-list">
            {meetings.map(meeting => 
            (
                <Link to={meeting.id.toString()} key={meeting.id}>
                    <p>{meetingToPraesidium(meeting)}, Meeting {meeting.meeting_no} &gt;&gt; {meeting.date}</p>
                </Link>
            ))}  
        </div>
    )
}

export default MeetingList

export const meetingsLoader = async () => {
    let meetings = []; 
    let praesidia = []; 
    let errorStatus = null; 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the meetings');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get("http://127.0.0.1:8000/api/meetings/meetings", config); 
            console.log('Meetings response', response.data)
            meetings = response.data;
            const response2 = await axios.get("http://localhost:8000/api/praesidium/praesidium", config); 
            console.log("Praesidia response", response2.data)
            praesidia = response2.data;
        } else {
            console.log("Sign in to get meetings")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view meetings")
            errorStatus = 401; 
        } else {
            console.error("Error fetching meetings or praesidia:", err);  
            errorStatus = err.status;                   
        }
    } finally {
        return [meetings, praesidia, errorStatus]; 
    }
}