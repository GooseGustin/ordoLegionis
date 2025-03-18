import axios from "axios"
import { useEffect, useState } from 'react'
import { NavLink, Link, useLoaderData } from "react-router-dom"
import { parseObjectKeys } from "../../../functionVault";
import Calendar from '../../../components/Calendar'


const BASEURL = "http://localhost:8000/api/";


const MeetingList = () => {
    const [praesidium, meetingsList] = useLoaderData();
    // const membershipKeys = parseObjectKeys(meetings.membership); 
    // const achievementKeys = parseObjectKeys(meeting)

    const [meetings, setMeetings] = useState(meetingsList);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (!selectedDate) return; // Don't fetch if no date is selected

        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                    const packet = {
                        pid: praesidium.id,
                        startDate: formattedDate,
                        endDate: null
                    };
                    console.log('packet', packet);
                    const response = await axios.post(BASEURL + 'meetings/filter_meetings', packet, config);
                    // const response = await axios.post(`${BASEURL}meetings/filter_meetings`, packet, config);
                    setMeetings(response.data); // Assuming response.data is an array of meetings
                } else {
                    console.log("Sign in to view meetings"); 
                }
            } catch (error) {
                console.error("Error fetching meetings:", error);
                setMeetings([]); // Reset meetings on error
            }
        };

        fetchMeetings();
    }, [selectedDate]);

    // Function to receive date from Calendar
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date); // Fetch meetings here
    };

    return (
        <div className="">
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='../'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">Praesidium</span>
                    </NavLink>
                    <NavLink className="nav-link" to='../meeting/create'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">New meeting</span>
                    </NavLink>

                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>

            {/* main  */}
            <main className="main-content pt-5">
                {/* <h2>Responsive Sidebar</h2> */}
                <p className="fs-3 text-dark">{praesidium.name} Praesidium</p>
                <div className="">
                    <Calendar handleDateChange={handleDateSelect} />
                </div>
                <div className="">
                    {meetings.map(meeting => {
                        const dateStr = new Date(meeting.date.split('-')).toDateString(); 
                        return (
                        <div className="border border-dark rounded rounded-3 p-3 my-2" key={meeting.id}>
                            <p className="fs-4">
                                <Link className="text-decoration-none text-dark" to={`${meeting.id}`}>
                                   <span className="mx-3"> Meeting {meeting.meeting_no}</span> | <span className="ms-3 text-primary fw-light fs-5">{dateStr}</span>
                                </Link>
                            </p>
                        </div>
                        )
                    })}

                </div>
            </main>
        </div>
    )
}

export default MeetingList


export const meetingListLoader = async ({ params }) => {
    const { pid } = params;
    const loc = "In the meeting list loader fxn";
    let praesidium;
    let meetings = [];

    console.log(loc);
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            console.log(loc, pid);
            const praesidiumResponse = await axios.get(BASEURL + `praesidium/praesidium/${pid}`, config);
            praesidium = praesidiumResponse.data;

            const packet = {
                pid: praesidium.id,
                endDate: new Date().toISOString().split('T')[0]
            };
            console.log(loc, 'packet', packet);
            const meetingsResponse = await axios.post(BASEURL + 'meetings/filter_meetings', packet, config);
            meetings = meetingsResponse.data; 

            // // Add the curia details to the praesidium data
            // praesidium.curiaDetails = curiaResponse.data;

        } else {
            console.log("Sign in to get workLists")
        }

    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            // errorStatus = 401;
        } else {
            console.error("Error fetching workLists or praesidium:", err);
            // errorStatus = err.status;

        }
    } finally {
        return [praesidium, meetings];
    }

}