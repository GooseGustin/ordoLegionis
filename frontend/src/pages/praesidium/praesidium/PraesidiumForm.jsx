import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PraesidiumForm = (props) => {
    const [curiae, setCuriae] = useState([]); 
    const navigate = useNavigate(); 
    const { obj, method } = props; 
    const countries = [
        {id: 0, name: "Nigeria"}
    ];
    
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

    console.log(obj, method)

    // const defaultName = obj? obj.name : '';
    // const defaultState = obj? obj.state: '';
    // const defaultParish = obj? obj.parish:''; 
    // const defaultAddress = obj? obj.address:'';
    // const defaultMeetingTime = obj? obj.meeting_time:''; 
    // const defaultCountry = obj? obj.country: countries[0].name; 
    // const defaultInaugDate = obj? obj.inaug_date: new Date();
    // const defaultSpirtualDirector = obj? obj.president:'';
    // const defaultPresident = obj? obj.president: '';
    // const defaultPresAppDate = obj? obj.pres_app_date: new Date(); 
    // const defaultVicePresident = obj? obj.vice_president: '';
    // const defaultVPAppDate  = obj? obj.vp_app_date: new Date(); 
    // const defaultSecretary = obj? obj.secretary: '';
    // const defaultSecAppDate = obj? obj.sec_app_date: new Date(); 
    // const defaultTreasurer = obj? obj.treasurer: '';
    // const defaultTresAppDate = obj? obj.tres_app_date: new Date(); 
    // const defaultNextReportDeadline= obj? obj.next_report_deadline: new Date(); 

    const defaultName = obj? obj.name : 'Tower of Heaven';
    const defaultState = obj? obj.state: 'Plateau';
    const defaultParish = obj? obj.parish:'St. Michael\'s Catholic Church, Nasarawa Gwom'; 
    const defaultAddress = obj? obj.address:'Inside the church hall';
    const defaultMeetingTime = obj? obj.meeting_time:'After 6:30 sunday mass'; 
    const defaultCountry = obj? obj.country: countries[0].name; 
    const defaultInaugDate = obj? obj.inaug_date: "2022-03-02"; // new Date();
    const defaultSpirtualDirector = obj? obj.president:'Fr. Mike';
    const defaultPresident = obj? obj.president: 'Mark';
    const defaultPresAppDate = obj? obj.pres_app_date: "2022-03-02"; // new Date(); 
    const defaultVicePresident = obj? obj.vice_president: 'James';
    const defaultVPAppDate  = obj? obj.vp_app_date: "2022-03-02"; // new Date(); 
    const defaultSecretary = obj? obj.secretary: 'Luke';
    const defaultSecAppDate = obj? obj.sec_app_date: "2022-03-02"; //new Date(); 
    const defaultTreasurer = obj? obj.treasurer: 'John';
    const defaultTresAppDate = obj? obj.tres_app_date: "2022-03-02"; // new Date(); 
    const defaultNextReportDeadline= obj? obj.next_report_deadline: "2025-03-05"; // new Date(); 

    const [formData, setFormData] = useState({
        curia: curiae[0]? curiae[0].id : 1, 
        name: defaultName, 
        state: defaultState, 
        parish: defaultParish, 
        country: defaultCountry,
        address: defaultAddress, 
        meeting_time: defaultMeetingTime, 
        inaug_date: defaultInaugDate, 
        spiritual_director: defaultSpirtualDirector, 
        president: defaultPresident, 
        pres_app_date: defaultPresAppDate, 
        vice_president: defaultVicePresident, 
        vp_app_date: defaultVPAppDate, 
        secretary: defaultSecretary, 
        sec_app_date: defaultSecAppDate, 
        treasurer: defaultTreasurer, 
        tres_app_date: defaultTresAppDate, 
        next_report_deadline: defaultNextReportDeadline,
        managers: obj? obj.managers:[], 
        management_requests: obj? obj.managers:[]
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const submitPraesidium = async (e) => {
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
                        const response = await axios.post("http://localhost:8000/api/praesidium/praesidium/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put("http://localhost:8000/api/praesidium/praesidium/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Praesidium Operation Successful!"); 
                    obj ? navigate(`/praesidium/${obj.id}`): navigate('/praesidium')
                    
                } else {
                    console.log("Sign in to operate on praesidia")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on praesidia")
            } else {
                console.log("Error during operation", err)              
            }
            
        } 
    } 
        

    const pageTitle = method=='create' ? "Create a praesidium": "Edit your praesidium"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='praesidium-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitPraesidium}>
            
                <label htmlFor="name">
                    Name: <input 
                        type="text" name='name' 
                        id='name' placeholder='Name' 
                        onChange={handleChange}
                        defaultValue={defaultName}
                    />
                </label><br /><br />
                <label htmlFor="state">
                    State: <input 
                        type="text" name='state' 
                        id='state' placeholder='State' 
                        onChange={handleChange}
                        defaultValue={defaultState}
                    />
                </label><br /><br />
                {/* Change to select for countries */}
                <label htmlFor="country"> 
                    Country: <select name="country" id="country" onChange={handleChange}>
                        
                        {countries.map(country => 
                        obj
                        ? (
                            <option 
                                value={country.name} 
                                key={country.id}
                                selected={country.name==obj.country ? true : false}
                                >{country.name}</option>
                        )
                        : (
                            <option 
                                value={country.name} 
                                key={country.id}
                                >{country.name}</option>
                        ))}  
                    </select>
                </label><br /><br />
                <label htmlFor="parish">
                    Parish: <input 
                        type="text" name='parish' 
                        id='parish' placeholder='Parish' 
                        onChange={handleChange}
                        defaultValue={defaultParish}
                    />
                </label><br /><br />
                <label htmlFor="curia">
                    Curia: <select name="curia" id="curia" onChange={handleChange}>
                        
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
                <label htmlFor="address">
                    Meeting address: <input 
                        type="text" name='address' 
                        id='address' placeholder='Address' 
                        onChange={handleChange}
                        defaultValue={defaultAddress}
                    />
                </label><br /><br />
                <label htmlFor="meeting_time">
                    Meeting time: <input 
                        type="text" name='meeting_time' 
                        id='meeting_time' placeholder='Meeting time' 
                        onChange={handleChange}
                        defaultValue={defaultMeetingTime}
                    /> 
                </label><br /><br />
                <label htmlFor="inaug_date">
                    Inauguration date: <input 
                        type="date" name='inaug_date' 
                        id='inaug_date' 
                        onChange={handleChange}
                        defaultValue={defaultInaugDate}
                    />
                </label><br /><br />
                <label htmlFor="spiritual_director">
                    Spiritual director: <input 
                        type="text" name='spiritual_director' 
                        id='spiritual_director' placeholder='Spiritual Director' 
                        onChange={handleChange}
                        defaultValue={defaultSpirtualDirector}
                    />
                </label><br /><br />
                <label htmlFor="president">
                    President: <input 
                        type="text" name='president' 
                        id='president' placeholder='President' 
                        onChange={handleChange}
                        defaultValue={defaultPresident}
                    />
                </label><br /><br />
                <label htmlFor="pres_app_date">
                    President appointment date: <input 
                        type="date" name='pres_app_date' 
                        id='pres_app_date' 
                        onChange={handleChange}
                        defaultValue={defaultPresAppDate}
                    />
                </label><br /><br />
                <label htmlFor="vice_president">
                    Vice President: <input 
                        type="text" name='vice_president' 
                        id='vice_president' placeholder='Vice President' 
                        onChange={handleChange}
                        defaultValue={defaultVicePresident}
                    />
                </label><br /><br />
                <label htmlFor="vp_app_date">
                    VP appointment date: <input 
                        type="date" name='vp_app_date' 
                        id='vp_app_date' 
                        onChange={handleChange}
                        defaultValue={defaultVPAppDate}
                    />
                </label><br /><br />
                <label htmlFor="secretary">
                    Secretary: <input 
                        type="text" name='secretary' 
                        id='secretary' placeholder='Secretary' 
                        onChange={handleChange}
                        defaultValue={defaultSecretary}
                    />
                </label><br /><br />
                <label htmlFor="sec_app_date">
                    Secretary appointment date: <input 
                        type="date" name='sec_app_date' 
                        id='sec_app_date' 
                        onChange={handleChange}
                        defaultValue={defaultSecAppDate}
                    />
                </label><br /><br />
                <label htmlFor="treasurer">
                    Treasurer: <input 
                        type="text" name='treasurer' 
                        id='treasurer' placeholder='Treasurer' 
                        onChange={handleChange}
                        defaultValue={defaultTreasurer} 
                    />
                </label><br /><br />
                <label htmlFor="tres_app_date">
                    Treasurer appointment date: <input 
                        type="date" name='tres_app_date' 
                        id='tres_app_date' 
                        onChange={handleChange}
                        defaultValue={defaultTresAppDate}
                    />
                </label><br /><br />
                <label htmlFor="next_report_deadline">
                    Next report deadline: <input 
                        type="date" name='next_report_deadline' 
                        id='next_report_deadline' 
                        onChange={handleChange}
                        defaultValue={defaultNextReportDeadline}
                    />
                </label><br /><br />
                
                <hr />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>

                
            </form>
        </div>
    )
}

[
    'id', 'name', 'state', 'country', 'parish', 'curia', 
    'iden', 'address', 'meeting_time', 'inaug_date', 
    'president', 'pres_app_date', 'vice_president', 
    'vp_app_date', 'secretary', 'sec_app_date', 
    'treasurer', 'tres_app_date', 'managers', 'members',
    'membership_requests', 'next_report_deadline', 
    'created_at'
]

export default PraesidiumForm
