import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, Link, useLoaderData, useNavigate } from 'react-router-dom'

const BASEURL = "http://127.0.0.1:8000/api/"; 




const MeetingForm = (props) => {
    const loc = "In meeting form"; 
    const [praesidium, workList, works] = useLoaderData();
    // const [praesidia, setPraesidia] = useState([]);
    const { obj, method } = props;
    console.log(obj, method)
    const navigate = useNavigate();

    console.log(loc, 'worklist', workList)

    // obj here is a meeting 
    const today = new Date();
    const defaultDate = obj ? obj.date : today.toISOString().substring(0, 10);
    // Get previous meeting's number and set as default 
    const defaultMeeting = obj ? obj.meeting : 1; // meetings[0].id;
    const defaultMeetingNo = obj ? obj.meeting_no : 1;
    const defaultNoPresent = obj ? obj.no_present : 1;
    const defaultOfficersAtMeeting = obj ? obj.officers_meeting_attendance : [];
    const defaultOfficersAtCuria = obj ? obj.officers_curia_attendance : [];
    const [officersMeetingAttendance, setOfficersMeetingAttendance] = useState(defaultOfficersAtMeeting);
    const [officersCuriaAttendance, setOfficersCuriaAttendance] = useState(defaultOfficersAtCuria); 


    const [meetingFormData, setMeetingFormData] = useState({
        praesidium: praesidium.id,
        date: defaultDate,
        meeting_no: defaultMeetingNo,
        no_present: defaultNoPresent,
        officers_meeting_attendance: defaultOfficersAtMeeting,
        officers_curia_attendance: defaultOfficersAtCuria
    })

    ////////////////////////////////////////////////////////////////////////
    // obj here is a financial record
    const defaultAcctStatement = obj ? obj.acct_statement : {
        acf: 0, sbc: 0, balance: 0
    };
    const defaultStatementAcf = obj ? obj.acct_statement.acf : 0;
    const defaultStatementSbc = obj ? obj.acct_statement.sbc : 0;
    const defaultStatementBalance = obj ? obj.acct_statement.balance : 0;

    const defaultExpenses = obj ? obj.acct_statement.expenses : {
        extension: 0, remittance: 0, stationery: 0, altar: 0,
        bouquet: 0, others: {}
    };
    const defaultExpenseExtension = obj ? obj.acct_statement.expenses.extension : 0;
    const defaultExpenseRemittance = obj ? obj.acct_statement.expenses.remittance : 0;
    const defaultExpenseStationery = obj ? obj.acct_statement.expenses.stationery : 0;
    const defaultExpenseAltar = obj ? obj.acct_statement.expenses.altar : 0;
    const defaultExpenseBouquet = obj ? obj.acct_statement.expenses.bouquet : 0;
    const defaultExpenseOthers = obj ? obj.acct_statement.expenses.others : {};

    const defaultAcctAnnouncement = obj ? obj.acct_announcement : {
        sbc: 0, collection_1: 0, collection_2: 0
    };
    const defaultAnnouncementSbc = obj ? obj.acct_announcement.sbc : 0;
    const defaultAnnouncementCol1 = obj ? obj.acct_announcement.collection_1 : 0;
    const defaultAnnouncementCol2 = obj ? obj.acct_announcement.collection_2 : 0;

    const [financialRecord, setFinancialRecord] = useState({
        meeting: defaultMeeting,
        acct_statement: defaultAcctStatement,
        acct_announcement: defaultAcctAnnouncement
    })

    const activeWorksList = workList.details.filter(item => {
        return item.active
    })
    const activeWorks = activeWorksList.map(item => item.name);
    const [doneWorks, setDoneWorks] = useState([]); 
    const [assignedWorks, setAssignedWorks] = useState([]); 
    let defaultWorkDetails = {}
    console.log(loc, 'works', works);
    if (works) {
        works.forEach((work) => {
            defaultWorkDetails[work.type] = work.details;
        })
    }
    console.log(loc, 'default work details', defaultWorkDetails); 
    const [workDetails, setWorkDetails] = useState(defaultWorkDetails)

    const handleWorkChange = (e) => {
        const loc = "In handle work change"; 
        console.log(loc, e.target.name);
        const targetName = e.target.name; 
        const metric = targetName.substring(targetName.lastIndexOf("_")+1); 
        const workType = targetName.substring(0, targetName.lastIndexOf("_")); 

        if (metric === 'done') {
            console.log(loc, 'done?', e.target.checked); 
            let closet = doneWorks; 
            if (e.target.checked) {
                closet.push(workType); 
                setDoneWorks(closet);
            } else {
                closet.splice(closet.indexOf(workType), 1);
                setDoneWorks(closet); 
            }
        } else if (metric === 'assigned') {
            console.log(loc, 'assigned?', e.target.checked); 
            let closet = assignedWorks; 
            if (e.target.checked) {
                closet.push(workType); 
                setAssignedWorks(closet);
            } else {
                closet.splice(closet.indexOf(workType), 1);
                setAssignedWorks(closet); 
            }
        } else  {
            console.log(loc, 'metric', metric, e.target.value)
            let closet = workDetails; 
            closet[workType] = {
                ...closet[workType], 
                [metric]: e.target.value
            };
            setWorkDetails(closet); 
        }
        console.log('assigned works', assignedWorks); 
        console.log('done works', doneWorks); 
        console.log('work details', workDetails); 
    }


    const [acctStatement, setAcctStatement] = useState(defaultAcctStatement);
    const handleStatementChange = (e) => {
        setAcctStatement({
            ...acctStatement,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled statement", acctStatement);
    }

    const [acctAnnouncement, setAcctAnnouncement] = useState(defaultAcctAnnouncement);
    const handleAnnouncementChange = (e) => {
        setAcctAnnouncement({
            ...acctAnnouncement,
            [e.target.name]: e.target.value * 1
        });
        console.log('handled announcement', acctAnnouncement);
    }

    const [expenses, setExpenses] = useState(defaultExpenses);
    const handleExpensesChange = (e) => {
        setExpenses({
            ...expenses,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled expenses", expenses, e)
    }
    ////////////////////////////////////////////////

    const handleMeetingChange = (e) => {
        console.log(e.target.name); 
        setMeetingFormData({
            ...meetingFormData,
            [e.target.name]: e.target.value
        });
    }

    const handleAttendanceChange = (e) => {
        console.log(e.target.name)
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
                closet.splice(closet.indexOf(officeName), 1);
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
        setMeetingFormData({
            ...meetingFormData, 
            officers_meeting_attendance: officersMeetingAttendance, 
            officers_curia_attendance: officersCuriaAttendance
        })
    }

    const submitMeeting = async (e) => {
        const loc = "In submit meeting";
        e.preventDefault();
        try {
            console.log('Trying to send', meetingFormData);
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };

                const acctStatementCopy = {
                    ...acctStatement,
                    expenses: expenses
                }

                let financialRecordCopy = {
                    ...financialRecord, 
                    acct_statement: acctStatementCopy, 
                    acct_announcement: acctAnnouncement 
                };
                
                // extend assignedWorks by doneWorks
                console.group(loc, assignedWorks, doneWorks);
                let allAssignedWorks = assignedWorks;
                // allAssignedWorks.concat(doneWorks.filter(work => !(assignedWorks.includes(work))))
                doneWorks.forEach((item) => {
                    if (!assignedWorks.includes(item)) {
                        allAssignedWorks.push(item)
                    }
                })
                setAssignedWorks(allAssignedWorks);
                console.log('\n\n', loc, 'assigned works copy', allAssignedWorks);

                // loop through assigned works and get works list for submission
                let meetId;  

                if (method === 'create') {
                    // Create meeting
                    console.log(loc, "meeting form data", meetingFormData); 
                    const meetingResponse = await axios.post(BASEURL + "meetings/meetings/", meetingFormData, config);
                    console.log("Success!", meetingResponse)
                    meetId = meetingResponse.data.id;
                    // Create financial record
                    financialRecordCopy = {
                        ...financialRecordCopy, 
                        meeting: meetId
                    };
                    console.log(loc, "financial record form", financialRecordCopy)
                    const recordResponse = await axios.post(BASEURL + "finance/records/", financialRecordCopy, config);
                    console.log("FinancialRecord created!", recordResponse.data);

                    // Create works
                    for (let i=0; i<allAssignedWorks.length; i++) {
                        const workItem = allAssignedWorks[i];
                        const workObj = {
                            type: workItem,
                            active: activeWorks.includes(workItem),
                            done: doneWorks.includes(workItem),
                            meeting: meetId,
                            details: workDetails[workItem]? workDetails[workItem]: {}
                        }
                        // console.log(loc, 'creating', workObj);
                        const workResponse = await axios.post(BASEURL + "works/work/", workObj, config);
                        console.log("Success!", workResponse.data)
                    }


                } else if (method === 'edit') {
                    console.log(loc, 'meeting form data', meetingFormData)
                    const meetingResponse = await axios.put(BASEURL + "meetings/meetings/" + obj.id + "/", meetingFormData, config);
                    console.log("Success!", meetingResponse)
                }
                console.log("Meeting Operation Successful!");


                ///////////////////////////////
                ///////////////////////////////////////////
                navigate(`../${meetId}`) // : navigate('../')

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
        <div className='meeting-form pt-5'>
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='post/create'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                        </span>
                        <span className="description"> <i className="fa-solid fa-right-from-bracket fa-lg"></i> New Praesidium</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon">
                            <i className="bi bi-clipboard"></i>
                        </span>
                        <span className="description">New Curia</span>
                    </NavLink>
                    <NavLink className="nav-link" to='/'>
                        <span className="icon"><i className="bi bi-bell"></i></span>
                        <span className="description">New Prayer Request</span>
                    </NavLink>

                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>
            {/* main content */}
            <div className="main-content">
            <h2 className="mt-5">{pageTitle}</h2>
            <hr />
            <form onSubmit={submitMeeting}>

                <p className="fs-4">Praesidium: {praesidium.name}</p>

                <div className="row">
                    <div className="col">
                        <label htmlFor="date">
                        Date: <input
                                type="date" name='date'
                                id='date' className='form-control'
                                onChange={handleMeetingChange}
                                defaultValue={defaultDate}
                            />
                        </label>
                    </div>
                </div>

                <div className="attendance border border-dark rounded rounded-3 p-3 my-2">
                <p className="fs-2 ">Attendance</p>
                <hr />
                <div className="row row-cols-lg-2">
                    <div className="col">
                        <label htmlFor="meeting_no">
                            <span className="me-1">Meeting no.</span>
                            <input
                                type="number"
                                name="meeting_no" id="meeting_no"
                                className='form-control-sm rounded rounded-3'
                                onChange={handleMeetingChange}
                                defaultValue={defaultMeetingNo} />
                        </label>

                    </div>
                    <div className="col">
                        <label htmlFor="no_present"> 
                            <span className="me-1">No. present</span>
                            <input
                                type="number"
                                name="no_present" id="no_present"
                                className='form-control-sm rounded rounded-3'
                                onChange={handleMeetingChange}
                                defaultValue={defaultNoPresent} />
                        </label>

                    </div>
                </div>

                <hr />
                <fieldset>
                <p className='fs-4'>Officers at meeting:</p>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="pres_at_meeting"><span className="me-1">President</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="pres_at_meeting" id="pres_at_meeting" 
                            defaultChecked={defaultOfficersAtMeeting.includes("President")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="vp_at_meeting"><span className="me-1">Vice President</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="vp_at_meeting" id="vp_at_meeting" 
                            defaultChecked={defaultOfficersAtMeeting.includes("Vice President")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sec_at_meeting"><span className="me-1">Secretary</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="sec_at_meeting" id="sec_at_meeting"                             
                            defaultChecked={defaultOfficersAtMeeting.includes("Secretary")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tres_at_meeting"><span className="me-1">Treasurer</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="tres_at_meeting" id="tres_at_meeting"
                            defaultChecked={defaultOfficersAtMeeting.includes("Treasurer")}
                        />
                    </label>
                    </div>
                </div>         
                </fieldset>
                <hr />
                <fieldset>
                <p className="fs-4">Officers at curia:</p>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="pres_at_curia"><span className="me-1">President</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="pres_at_curia" id="pres_at_curia" 
                            defaultChecked={defaultOfficersAtMeeting.includes("President")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="vp_at_curia"><span className="me-1">Vice President</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="vp_at_curia" id="vp_at_curia" 
                            defaultChecked={defaultOfficersAtMeeting.includes("Vice President")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sec_at_curia"><span className="me-1">Secretary</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="sec_at_curia" id="sec_at_curia"                             
                            defaultChecked={defaultOfficersAtMeeting.includes("Secretary")}
                        />
                    </label>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tres_at_curia"><span className="me-1">Treasurer</span>
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={handleAttendanceChange} 
                            name="tres_at_curia" id="tres_at_curia"
                            defaultChecked={defaultOfficersAtMeeting.includes("Treasurer")}
                        />
                    </label>
                    </div>
                </div>   
                </fieldset>
                </div>

                <div className="finances border border-dark rounded rounded-3 p-3 my-2">


                <p className="fs-2">Finances</p>                    
                {/* Acct Statement */}
                <hr />
                <fieldset>
                    <p className="fs-4">Account Statement</p>
                    <div className="acct-statement row row-cols-lg-3 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="acf"><span className="me-1">ACF</span>
                                <input 
                                    type="number" name="acf" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleStatementChange}
                                    defaultValue={defaultStatementAcf} />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="sbc"><span className="me-1">SBC</span>
                                <input 
                                    type="number" name="sbc" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleStatementChange}
                                    defaultValue={defaultStatementSbc} />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="balance"><span className="me-1">Balance</span>
                                <input 
                                    type="number" name="balance" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleStatementChange}
                                    defaultValue={defaultStatementBalance} />
                            </label>
                        </div>
                    </div>
                </fieldset>

                {/* Expenses */}
                <hr />
                <p className="fs-4">Expenses</p>
                <fieldset>
                    <div className="expenses row row-cols-lg-3 row-cols-md-2 gy-2">
                        <div className="col">
                        <label htmlFor="extension"><span className="me-1">Extension</span>
                            <input type="number" name="extension" id=""
                                className='form-control-sm rounded rounded-3'
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseExtension}/>
                        </label>
                        </div>
                        <div className="col">
                        <label htmlFor="remittance"><span className="me-1">Remittance</span>
                            <input type="number" name="remittance" id=""
                                className='form-control-sm rounded rounded-3'
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseRemittance} />
                        </label>
                        </div>
                        <div className="col">
                        <label htmlFor="stationery"><span className="me-1">Stationery</span>
                            <input type="number" name="stationery" id=""
                                className='form-control-sm rounded rounded-3'
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseStationery} />
                        </label>

                        </div>
                        <div className="col">
                        <label htmlFor="altar"><span className="me-1">Altar</span>
                            <input type="number" name="altar" id=""
                                className='form-control-sm rounded rounded-3'
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseAltar} />
                        </label>

                        </div>
                        <div className="col">
                        <label htmlFor="bouquet"><span className="me-1">Bouquet</span>
                            <input type="number" name="bouquet" id=""
                                className='form-control-sm rounded rounded-3'
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseBouquet} />
                        </label>

                        </div>
                        
                    </div>
                    <div className="row row-cols-lg-3 row-cols-md-2 mt-3 gy-2 border mx-2 p-2">
                        <div className="col col-md-2 col-lg-2">
                            <label htmlFor="">
                                <span className="me-1">Others</span>
                            </label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <input 
                                type="text" 
                                className="form-control border border-dark" 
                                placeholder='Purpose'
                                />
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <input 
                                type="number" 
                                name="" 
                                className='form-control-sm rounded rounded-3'
                                placeholder='0'
                            />
                            <span className="icon ">
                                <i className="bi bi-grid">+</i>
                            </span>
                        </div>
                    </div>
                </fieldset>

                {/* Acct Announcement */}
                <hr />
                <fieldset>
                    <p className="fs-4">Account Announcement</p>
                    <div className="acct-announcementrow row row-cols-lg-3 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="sbc"><span className="me-1">SBC</span>
                                <input 
                                    type="number" name="sbc" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleAnnouncementChange}
                                    defaultValue={defaultAnnouncementSbc} />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="collection_1"><span className="me-1">Collection 1</span>
                                <input 
                                    type="number" name="collection_1" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleAnnouncementChange}
                                    defaultValue={defaultAnnouncementCol1} />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="collection_2"><span className="me-1">Collection 2</span>
                                <input 
                                    type="number" name="collection_2" id=""
                                    className='form-control-sm rounded rounded-3'
                                    onChange={handleAnnouncementChange}
                                    defaultValue={defaultAnnouncementCol2} />
                            </label>
                        </div>
                    </div>
                </fieldset>
                </div>

                <div className="works border border-dark rounded rounded-3 p-3 my-2">

                {/* Works */}
                <p className="fs-2">Works</p>
                <hr />
                <fieldset className="px-3">
                <div className="row row-cols-md-2">
                    {workList.details.map(typeObj => {
                        const validMetrics = []; 
                        for (let key in typeObj.metrics) {
                            if (typeObj.metrics[key]) {
                                validMetrics.push(key)
                            }
                        }
                        return (
                            <div className="col p-1" key={typeObj.id}>
                                <div className="row text-secondary">{typeObj.name}
                                </div>
                                <div className="row">
                                    <label htmlFor="">Assigned
                                    <input 
                                        type="checkbox" 
                                        name={typeObj.name+"_assigned"} id="" 
                                        className='ms-2 form-check-input'
                                        onChange={handleWorkChange}
                                        />
                                    </label>
                                    <label htmlFor="">Done
                                    <input 
                                        type="checkbox" 
                                        name={typeObj.name+"_done"} id="" 
                                        className='ms-2 form-check-input'
                                        onChange={handleWorkChange}
                                    /></label>
                                </div>
                                <div className="row">
                                    {validMetrics.map(metric => (
                                        <label htmlFor={metric} key={metric}>
                                            <input 
                                                type="number" 
                                                name={typeObj.name + "_" + metric} 
                                                className="form-control-sm rounded rounded-3" 
                                                onChange={handleWorkChange}
                                            /> <span className="ms-1">{metric}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
                </fieldset>
                </div>

                <div className="row mb-4">
                    <div className="col-4"></div>
                    <div className="col">
                        <button className='btn btn-success' type="submit">{btnTitle}</button>
                    </div>
                    <div className="col">
                        <Link to='../../' className='btn btn-info'>Cancel</Link>
                    </div>
                    <div className="col-4"></div>
                </div>

            </form>
            </div>
        </div>
    )

}

export default MeetingForm


export const meetingFormLoader = async ({params}) => {
    // Get praesidium for meeting creation
    const loc = "In meeting form loader"; 
    const { pid, mid } = params; 
    console.log(loc, pid, params);
    console.log(loc, 'mid', mid);
    let praesidium, workList, works; 

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const praesidiumResponse = await axios.get(BASEURL + "praesidium/praesidium/" + pid, config);
            const workListResponse = await axios.get(BASEURL + `works/work_list/?pid=${pid}`, config); 
            praesidium = praesidiumResponse.data; 
            workList = workListResponse.data;
            // praesidia = praesidiaResponse.data.map(praesidium => {
            //     return {...praesidium, type: 'praesidium'};
            // }); 

            if (mid) {
                const worksResponse = await axios.get(BASEURL + `works/work/?mid=${mid}`, config);
                works = worksResponse.data; 
            }

            let count = 1;
            let workListWithIds = []; 
            workList.details.forEach(function (item) {
                workListWithIds.push({
                    ...item, 
                    id: count
                }); 
                count++;
            })
            workList.details = workListWithIds;
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
    } finally {
        return [praesidium, workList, works]; 
    }

}