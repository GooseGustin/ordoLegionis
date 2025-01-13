import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const CuriaList = () => {
    const [curiae, setCuriae] = useState([]); 
    const [errStatus, setErrStatus] = useState(); 

    useEffect(() => {
        const getCuriae = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    console.log('Get the curiae');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/curia/curia", config); 
                    console.log('Curia response', response.data)
                    setCuriae(response.data)
                } else {
                    console.log("Sign in to get curiae")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view curiae")
                    setErrStatus(401); 
                } else {
                    console.error("Error fetching curiae:", err);                    
                }
            }
        }
        getCuriae();
    }, [])

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view curiae.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }
    return (
        <div className="curia-list">
            {curiae.map(curia => 
            (
                <Link to={curia.id.toString()} key={curia.id}>
                    <p>{curia.name}</p>
                </Link>
            ))}  
        </div>
    )
}

export default CuriaList
