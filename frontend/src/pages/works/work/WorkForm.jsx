import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MeetingForm = (props) => {
    const [praesidia, setPraesidia] = useState([]);
    const { obj, method } = props;
    console.log(obj, method)
    const navigate = useNavigate();

    useEffect(() => {
        const getPraesidia = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/praesidium/praesidium", config);
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

    const today = new Date();
    const defaultDate = obj ? obj.date : today.toISOString().substring(0, 10);
    // Get previous meeting's number and set as default 
    const defaultMeetingNo = obj ? obj.meeting_no : 1;
    const defaultNoPresent = obj ? obj.no_present : 1;
    const defaultOfficersAtMeeting = obj ? obj.officers_meeting_attendance : [];
    const defaultOfficersAtCuria = obj ? obj.officers_curia_attendance : [];
    const [officersMeetingAttendance, setOfficersMeetingAttendance] = useState(defaultOfficersAtMeeting);
    const [officersCuriaAttendance, setOfficersCuriaAttendance] = useState(defaultOfficersAtCuria); 


    const [formData, setFormData] = useState({
        praesidium: praesidia[0] ? praesidia[0].id : 1,
        date: defaultDate,
        meeting_no: defaultMeetingNo,
        no_present: defaultNoPresent,
        officers_meeting_attendance: defaultOfficersAtMeeting,
        officers_curia_attendance: defaultOfficersAtCuria
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckboxChange = (e) => {
        const officerMapping = {
            pres_at: "President", 
            vp_at: "Vice President", 
            sec_at: "Secretary", 
            tres_at: "Treasurer"
        }
        const targetName = e.target.name; 
        const council = targetName.substring(targetName.lastIndexOf("_")+1); 
        const officer = targetName.substring(0, targetName.lastIndexOf("_")); 
        
        const officeName = officerMapping[officer];
        if (council == 'meeting') { // If praesidium meeting 
            var closet = officersMeetingAttendance; 
            console.log('Closet meeting:', closet)
            if (!officersMeetingAttendance.includes(officeName)) { // If not already recorded, add to record
                closet.push(officeName);
            } else { // If already recorded, remove from record
                closet.splice(closet.indexOf(officeName), 1)    ;
            }
            setOfficersMeetingAttendance(closet);
        } else if (council == 'curia') { // If curia meeting
            var closet = officersCuriaAttendance; 
            console.log('Closet curia:', closet)
            if (!officersCuriaAttendance.includes(officeName)) { // If not already recorded, add to record
                closet.push(officeName);
            } else { // If already recorded, remove from record
                closet.splice(closet.indexOf(officeName), 1)    ;
            }
            setOfficersCuriaAttendance(closet);
        }
        console.log(officersMeetingAttendance, officersCuriaAttendance);
        setFormData({
            ...formData, 
            officers_meeting_attendance: officersMeetingAttendance, 
            officers_curia_attendance: officersCuriaAttendance
        })
    }

    const submitMeeting = async (e) => {
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

                if (method === 'create') {
                    const response = await axios.post("http://localhost:8000/api/meetings/meetings/", formData, config);
                    console.log("Success!", response)
                } else if (method === 'edit') {
                    const response = await axios.put("http://localhost:8000/api/meetings/meetings/" + obj.id + "/", formData, config);
                    console.log("Success!", response)
                }
                console.log("Meeting Operation Successful!");
                obj ? navigate(`/meetings/${obj.id}`) : navigate('/meetings')

            } else {
                console.log("Sign in to operate on meetings")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on meetings")
            } else {
                console.log("Error during operation", err)
            }

        }
    }

    const pageTitle = method == 'create' ? "Create a meeting" : "Edit your meeting";
    const btnTitle = method == 'create' ? "Create" : "Edit";

    return (
        <div className='meeting-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitMeeting}>

                <label htmlFor="praesidium">
                    Praesidium: 
                    <select name="praesidium" id="praesidium" 
                        onChange={handleChange}>
                        {praesidia.map(praesidium =>
                            obj
                                ? (
                                    <option
                                        value={praesidium.id}
                                        key={praesidium.id}
                                        selected={praesidium.id == obj.praesidium ? true : false}
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
                <label htmlFor="deadline">
                    Date: <input
                        type="date" name='date'
                        id='date'
                        onChange={handleChange}
                        defaultValue={defaultDate}
                    />
                </label><br /><br />
                <label htmlFor="meeting_no">
                    Meeting no.:
                    <input
                        type="number"
                        name="meeting_no" id="meeting_no"
                        onChange={handleChange}
                        defaultValue={defaultMeetingNo} />
                </label><br /><br />
                <label htmlFor="no_present">
                    No. present:
                    <input
                        type="number"
                        name="no_present" id="no_present"
                        onChange={handleChange}
                        defaultValue={defaultNoPresent} />
                </label><br /><br />

                <fieldset>
                <label htmlFor="">Officers at meeting:</label>
                <p>
                    <label htmlFor="pres_at_meeting">President
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="pres_at_meeting" id="pres_at_meeting" 
                            defaultChecked={defaultOfficersAtMeeting.includes("President")}
                        />
                    </label>
                    <label htmlFor="vp_at_meeting">Vice President
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="vp_at_meeting" id="vp_at_meeting" 
                            defaultChecked={defaultOfficersAtMeeting.includes("Vice President")}
                        />
                    </label>
                    <label htmlFor="sec_at_meeting">Secretary
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="sec_at_meeting" id="sec_at_meeting"                             
                            defaultChecked={defaultOfficersAtMeeting.includes("Secretary")}
                        />
                    </label>
                    <label htmlFor="tres_at_meeting">Treasurer
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="tres_at_meeting" id="tres_at_meeting"
                            defaultChecked={defaultOfficersAtMeeting.includes("Treasurer")}
                        />
                    </label>           
                </p>
                </fieldset>
                <fieldset>
                <label htmlFor="">Officers at curia:</label>
                <p>
                    <label htmlFor="pres_at_curia">President
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="pres_at_curia" id="pres_at_curia"
                            defaultChecked={defaultOfficersAtCuria.includes("President")}
                        />
                    </label>
                    <label htmlFor="vp_at_curia">Vice President
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="vp_at_curia" id="vp_at_curia"
                            defaultChecked={defaultOfficersAtCuria.includes("Vice President")} />
                    </label>
                    <label htmlFor="sec_at_curia">Secretary
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="sec_at_curia" id="sec_at_curia"
                            defaultChecked={defaultOfficersAtCuria.includes("Secretary")} />
                    </label>
                    <label htmlFor="tres_at_curia">Treasurer
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange} 
                            name="tres_at_curia" id="tres_at_curia"
                            defaultChecked={defaultOfficersAtCuria.includes("Treasurer")} />
                    </label>                    
                </p>
                </fieldset>
                <hr />
                <button type="submit">{btnTitle}</button>
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}


    // [
    //     'id', 
    //     'type', 
    //     'active', 
    //     'done', 
    //     'meeting',
    //     'details' 
    // ]

export default MeetingForm

