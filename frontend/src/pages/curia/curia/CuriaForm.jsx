import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CuriaForm = (props) => {
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    // const [title, setTitle] = useState(); 

    console.log(obj, method)

    const defaultName = obj? obj.name : '';
    const defaultState = obj? obj.state: '';
    const defaultParish = obj? obj.parish:''; 
    const defaultCountry = obj? obj.country: ''; 
    const defaultSpirtualDirector = obj? obj.spiritual_director:'';

    const [formData, setFormData] = useState({
        name: defaultName, 
        state: defaultState, 
        parish: defaultParish, 
        country: defaultCountry,
        spiritual_director: defaultSpirtualDirector, 
        managers: obj? obj.managers:[], 
        management_requests: obj? obj.managers:[]
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const submitCuria = async (e) => {
        e.preventDefault();
        // if (isLoading) {
        //     return
        // }

        // setIsLoading(true); 

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
                        const response = await axios.post("http://localhost:8000/api/curia/curia/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put("http://localhost:8000/api/curia/curia/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Curia Operation Successful!"); 
                    obj ? navigate(`/curia/${obj.id}`): navigate('/curia')
                    
                } else {
                    console.log("Sign in to operate on curiae")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on curiae")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        

    const pageTitle = method=='create' ? "Create a curia": "Edit your curia"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='curia-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitCuria}>
                <label htmlFor="name">
                    <input 
                        type="text" name='name' 
                        id='name' placeholder='Name' 
                        onChange={handleChange}
                        defaultValue={defaultName}
                    />
                </label><br /><br />
                <label htmlFor="state">
                    <input 
                        type="text" name='state' 
                        id='state' placeholder='State' 
                        onChange={handleChange}
                        defaultValue={defaultState}
                    />
                </label><br /><br />
                {/* Change to select for countries */}
                <label htmlFor="country"> 
                    <input 
                        type="text" name='country' 
                        id='title' placeholder='Country' 
                        onChange={handleChange}
                        defaultValue={defaultCountry}
                    />
                </label><br /><br />
                <label htmlFor="parish">
                    <input 
                        type="text" name='parish' 
                        id='parish' placeholder='Parish' 
                        onChange={handleChange}
                        defaultValue={defaultParish}
                    />
                </label><br /><br />
                <label htmlFor="spiritual_director">
                    <input 
                        type="text" name='spiritual_director' 
                        id='spiritual_director' placeholder='Spiritual Director' 
                        onChange={handleChange}
                        defaultValue={defaultSpirtualDirector}
                    />
                </label><br /><br />
                <hr />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}

export default CuriaForm
