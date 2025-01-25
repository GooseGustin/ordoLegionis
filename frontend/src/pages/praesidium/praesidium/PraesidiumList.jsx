import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const PraesidiumList = () => {
    const [praesidia, setPraesidiume] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getPraesidium = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the praesidia');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/praesidium/praesidium", config); 
                    console.log('Praesidium response', response.data)
                    setPraesidiume(response.data)
                } else {
                    console.log("Sign in to get praesidia")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view praesidia")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching praesidia:", err);                    
                }
            }
        }
        getPraesidium();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view praesidia.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="praesidium-list">
            {praesidia.map(praesidium => 
            (
                <Link to={praesidium.id.toString()} key={praesidium.id}>
                    <p>{praesidium.name}</p>
                </Link>
            ))}  
        </div>
    )
}

export default PraesidiumList
