import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

const BASEURL = "http://127.0.0.1:8000/api/";

function findall(a, x) {
    var results = [], 
    len = a.length,
    pos = 0; 
    while(pos < len) { 
    pos = a.indexOf(x, pos); 
    if (pos === -1) break; 
    results.push(pos); 
    pos = pos + 1; 
    }
    return results;
}

const FunctionRow = ({name, title, handler, fxnAttendance}) => {
    const 
    fxn_date = name+'_fxn_date',
    current_year = name + '_current_year', 
    previous_year = name + '_previous_year'; 

    return (
        <tr>
            <td><label>{title}</label></td>
            <td>
                <input 
                    type="date" name={fxn_date} id="" 
                    defaultValue={fxnAttendance[name]['date']}
                    onChange={handler}
                />
            </td>
            <td>
                <input 
                    type="number" 
                    name={current_year} id="" 
                    defaultValue={fxnAttendance[name]['current_year_attendance']}
                    onChange={handler}
                />
            </td>
            <td>
                <input 
                    type="number" 
                    name={previous_year} id="" 
                    defaultValue={fxnAttendance[name]['previous_year_attendance']}
                    onChange={handler}
                />
            </td>
        </tr>
    )
}

const ReportForm = () => {
    const loc = "In report form component"; 
    console.log(loc)
    const [obj, praesidia, prepData] = useLoaderData();
    // console.log('prepData:', prepData); 
    const [report, setReport] = useState({
        "praesidium": 1,
        "submission_date": new Date().toISOString().substring(0, 10),
        "last_submission_date": prepData.last_submission_date,
        "report_number": prepData.last_report_number+1,
        "report_period": 52,
        "last_curia_visit_date": null,
        "last_curia_visitors": [],
        "officers_curia_attendance": prepData.officers_curia_attendance,
        "officers_meeting_attendance": prepData.officers_meeting_attendance,
        "extension_plans": "",
        "problems": "",
        "remarks": "",
        "no_meetings_expected": prepData.no_meetings_expected,
        "no_meetings_held": prepData.no_meetings_held,
        "avg_attendance": prepData.average_attendance,
        "poor_attendance_reason": "",
        "membership_details": 1,
        "achievements": 1
    })
    const [membership, setMembership] = useState({
        senior_praesidia: 0,
        junior_praesidia: 0,
        active_members: 0,
        probationary_members: 0,
        auxiliary_members: 0,
        adjutorian_members: 0,
        praetorian_members: 0
    })
    const [achievement, setAchievement] = useState({
        no_recruited: 0,
        no_baptized: 0,
        no_confirmed: 0,
        no_first_communicants: 0,
        others: {}
    })
    const [fxnAttendance, setFxnAttendance] = useState({
        'acies': {name:'Acies', date: '',  current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'may_devotion': {name:'May Devotion', date: '2024-05-01', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'edel_quinn': {name:"Edel Quinn Mass", date: '2024-05-12', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'aer': {name:'Annual Enclosed Retreat', date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'marys_birthday': {name:"Mary's Birthday", date: '2024-09-08', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'officers_workshop': {name:"Officers' Workshop", date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'oct_devotion': {name:"October Devotion", date: '2024-10-01', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'departed_leg': {name:"Departed Legionaries' Mass", date: '2024-11-02', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'frank_duff': {name:"Frank Duff Mass", date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'leg_congress': {name:'Legion Congress', date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'outdoor_fxn': {name:"Outdoor Function", date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'patricians': {name:"Patricians Meeting", date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'agr': {name:"Annual General Reunion", date: '', current_year_attendance:0, previous_year_attendance:0, report:0}, 
        'exp_dom': {name:'Exploratio Dominicalis', date: '', current_year_attendance:0, previous_year_attendance:0, report:0}
    })

    // const obj = {
    //     "id": 1,
    //     "praesidium": 1,
    //     "submission_date": "2025-02-16",
    //     "last_submission_date": "2024-02-11",
    //     "report_number": 2,
    //     "report_period": 52,
    //     "last_curia_visit_date": "2025-01-31",
    //     "last_curia_visitors": [
    //         "Bro. Jacob Kim"
    //     ],
    //     "officers_curia_attendance": {
    //         "President": 8,
    //         "Vice President": 12,
    //         "Secretary": 10,
    //         "Treasurer": 9
    //     },
    //     "officers_meeting_attendance": {
    //         "President": 48,
    //         "Vice President": 52,
    //         "Secretary": 50,
    //         "Treasurer": 49
    //     },
    //     "extension_plans": "To talk to lapsed members",
    //     "problems": "To many student members",
    //     "remarks": "",
    //     "no_meetings_expected": 52,
    //     "no_meetings_held": 52,
    //     "avg_attendance": 4,
    //     "poor_attendance_reason": "Students make up the bulk of the members",
    //     "membership_details": 1,
    //     "achievements": 1
    // };


    // let obj2 = null;

    const today = new Date().toISOString().substring(0, 10);

    const [defaultObj, setDefaultObj]= useState({
        praesidium: obj? obj.praesidium: 1, 
        submission_date: obj? obj.submission_date: today, 
        last_submission_date: obj? obj.last_submission_date: prepData.last_submission_date,
        report_number: obj? obj.report_number: prepData.last_report_number+1, 
        report_period: obj? obj.report_period: 52, 
        last_curia_visit_date: obj? obj.last_curia_visit_date: today, 
        last_curia_visitors: obj? obj.last_curia_visitors: [], 
        officers_curia_attendance: obj? obj.officers_curia_attendance: prepData.officers_curia_attendance,
        officers_meeting_attendance: obj? obj.officers_meeting_attendance: prepData.officers_meeting_attendance, 
        extension_plans: obj? obj.extension_plans: 'We intend to recruit more members', 
        problems: obj? obj.problems: '', 
        remarks: obj? obj.remarks: '', 
        no_meetings_expected: obj? obj.no_meetings_expected: prepData.no_meetings_expected, 
        no_meetings_held: obj? obj.no_meetings_held: prepData.no_meetings_held, 
        avg_attendance: obj? obj.avg_attendance: prepData.average_attendance, 
        poor_attendance_reason: obj? obj.poor_attendance_reason: "", 
        membership_details: obj? obj.membership_details: 1, // object 
        achievements: obj? obj.achievements: 1 // object
    })

    // setDefaultObj({
    //     ...defaultObj, 
    //     ...prepData
    // })

    // console.log(defaultObj.officers_curia_attendance)

    const handleChange = (e) => {
        let value = e.target.value; 
        if (!isNaN(value)) {
            value = value * 1; 
        } // Convert value to a number if possible
        setReport({
            ...report, 
            [e.target.name]: value
        })
    };
    
    const handleMembershipChange = (e) => {
        let targetName = e.target.name
        targetName = targetName.substring(0, targetName.lastIndexOf("_"));
        console.log('In membership', targetName); 
        setMembership({
            ...membership, 
            [targetName]: e.target.value * 1
        })
        console.log(membership);
    };

    const handleAchievementChange = (e) => {
        let targetName = e.target.name
        targetName = targetName.substring(0, targetName.lastIndexOf("_"));
        setAchievement({
            ...achievement, 
            [targetName]: e.target.value * 1
        })
    };

    const handleFxnAttendanceChange = (e) => {
        
        const loc = 'In handle fxn attendance';
        console.log(loc, e.target.name);

        const suffixToKeyMapping = {
            'fxn_date': 'date', 
            'current_year': 'current_year_attendance', 
            'previous_year': 'previous_year_attendance', 
        }
        
        const targetName = e.target.name; 
        const delimiterIndices = findall(targetName, '_');
        const breakPoint = delimiterIndices[delimiterIndices.length-2]; 

        const keyName = suffixToKeyMapping[targetName.substring(breakPoint+1)];
        const fxnName = targetName.substring(0, breakPoint); 

        console.log(keyName, fxnName);
        let value = e.target.value; 
        if (!isNaN(value)) {
            value = value * 1; 
        } // Convert value to a number if possible
        setFxnAttendance({
            ...fxnAttendance, 
            [fxnName]: {
                ...fxnAttendance[fxnName],
                [keyName]: value
            }
        })

        console.log(fxnAttendance)
    };

    const handleAttendanceChange = (e) => {
        console.log(e.target.name)
        const officerMapping = {
            pres_at: "President", 
            vp_at: "Vice President", 
            sec_at: "Secretary", 
            tres_at: "Treasurer"
        }
        const targetName = e.target.name; 
        const value = e.target.value * 1;
        const council = targetName.substring(targetName.lastIndexOf("_")+1); 
        const officer = targetName.substring(0, targetName.lastIndexOf("_")); 
        const officeName = officerMapping[officer];
        if (council == 'meeting') { // If praesidium meeting 
            setReport({
                ...report, 
                officers_meeting_attendance: {
                    ...report.officers_meeting_attendance, 
                    [officeName]: value
                }
            })
        } else if (council == 'curia') { // If curia meeting
            setReport({
                ...report, 
                officers_curia_attendance: {
                    ...report.officers_curia_attendance, 
                    [officeName]: value
                }
            })
        }
    };

    const submitReport = async (e) => {
        e.preventDefault();
        const loc = "In report submission";
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                // Create membership details
                console.log(loc, 'membership', membership); 
                const membershipResponse = await axios.post(BASEURL + 'reports/membership/', membership, config)
                console.log('Membership created!', membershipResponse)
                const membershipId = membershipResponse.data.id; 

                // Create achievement
                console.log(loc, 'achievement', achievement); 
                const achievementResponse = await axios.post(BASEURL + 'reports/achievement/', achievement, config)
                console.log('Achievement created!', achievementResponse)
                const achievementId = achievementResponse.data.id; 

                // Create report
                console.log(loc, 'report', report); 
                const reportCopy = {
                    ...report, 
                    membership_details: membershipId, 
                    achievements: achievementId
                }
                setReport(reportCopy); 
                const reportResponse = await axios.post(BASEURL + "reports/report/", reportCopy, config)
                console.log("Report created!", reportResponse.data)
                const reportId = reportResponse.data.id; 

                // Bulk create function attendances
                console.log(loc, 'fxn attendances', fxnAttendance);
                for (let key in fxnAttendance) {
                    const fxn = fxnAttendance[key];
                    if (fxn.date) {
                        const attendanceObj = {
                            name: fxn.name, 
                            date: fxn.date, 
                            current_year_attendance: fxn.current_year_attendance, 
                            previous_year_attendance: fxn.previous_year_attendance,
                            report: reportId
                        }
                        const fxnAttendanceResponse = await axios.post(BASEURL + "reports/attendance/", attendanceObj, config)
                        console.log(fxn.name, "attendance created!", fxnAttendanceResponse.data.id);
                    }
                }
                


                // Navigate to edit form filled with obj details
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on financialRecords")
            } else {
                console.log("Error during operation", err)
            }
        }
    }

    const fxnNameAndTitle = [
        ['acies', 'Acies'], 
        ['may_devotion', 'May Devotion'], 
        ['edel_quinn', 'Edel Quinn Mass'], 
        ['aer', 'Annual Enclosed Retreat'], 
        ['marys_birthday', "Mary's Birthday"], 
        ["officers_workshop", "Officers' Workshop"], 
        ["oct_devotion", "October Devotion"], 
        ["departed_leg", "Departed Legionaries Mass"], 
        ["frank_duff", 'Frank Duff Mass'], 
        ["leg_congress", "Legion Congress"], 
        ["outdoor_fxn", "Outdoor Function"], 
        ["patricians", "Patricians Meeting"], 
        ["agr", "Annual General Reunion"], 
        ["exp_dom", "Exploratio Dominicalis"]
    ]

    return (
        <div>
            <h2>Edit Report</h2>
            <hr />
            <form onSubmit={submitReport}>

                <label htmlFor="praesidium">
                    Praesidium:
                    <select name="praesidium" id="praesidium"
                        onChange={handleChange}>
                        {praesidia.map(praesidium =>
                            // obj
                            //     ? (
                            //         <option
                            //             value={praesidium.id}
                            //             key={praesidium.id}
                            //             selected={praesidium.id == obj.praesidium ? true : false}
                            //         >{praesidium.name}</option>
                            //     )
                            //     : 
                                (
                                    <option
                                        value={praesidium.id}
                                        key={praesidium.id}
                                    >{praesidium.name}</option>
                                ))}
                    </select>
                </label><br /><br />
                <label htmlFor="submission_date">
                    Submission date: 
                    <input
                        type="date" name='submission_date'
                    // id='date'
                        onChange={handleChange}
                        defaultValue={defaultObj.submission_date}
                    />
                </label><br /><br />
                <label htmlFor="last_submission_date">
                    Last submission date: 
                    <input
                        type="date" name='last_submission_date'
                    // id='date'
                        onChange={handleChange}
                        defaultValue={defaultObj.last_submission_date}
                    />
                </label><br /><br />
                <label htmlFor="report_no">
                    Report no.:
                    <input
                        type="number"
                        name="report_no" id="report_no"
                        onChange={handleChange}
                        defaultValue={defaultObj.report_number}
                    />
                </label><br /><br />
                <label htmlFor="report_period">
                    Report period (months):
                    <input
                        type="number"
                        name="report_period" id="report_period"
                        onChange={handleChange}
                        defaultValue={defaultObj.report_period}
                    />
                </label><br /><br />
                <label htmlFor="last_curia_visit_date">
                    Last Curia visit date: <input
                        type="date" name='last_curia_visit_date'
                    // id='date'
                        onChange={handleChange}
                        defaultValue={defaultObj.last_curia_visit_date}
                    />
                </label><br /><br />
                
                {/* Officers Curia Attendance */}
                <fieldset>
                    <p>Officers Curia attendance:</p>
                    <label htmlFor="pres_at_curia">President
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="pres_at_curia" id="pres_at_curia"
                            defaultValue={defaultObj.officers_curia_attendance["President"]}
                        />
                    </label><br /><br />
                    <label htmlFor="vp_at_curia">Vice President
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="vp_at_curia" id="vp_at_curia"
                            defaultValue={defaultObj.officers_curia_attendance["Vice President"]}
                        />
                    </label><br /><br />
                    <label htmlFor="sec_at_curia">Secretary
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="sec_at_curia" id="sec_at_curia"
                            defaultValue={defaultObj.officers_curia_attendance.Secretary}
                        />
                    </label><br /><br />
                    <label htmlFor="tres_at_curia">Treasurer
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="tres_at_curia" id="tres_at_curia"
                            defaultValue={defaultObj.officers_curia_attendance.Treasurer}
                        />
                    </label>
                </fieldset>

                {/* Officers Meeting Attendance */}
                <fieldset>
                    <p>Officers Meeting attendance:</p>
                    <label htmlFor="pres_at_meeting">President
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="pres_at_meeting" id="pres_at_meeting"
                            defaultValue={defaultObj.officers_meeting_attendance.President}
                        />
                    </label><br /><br />
                    <label htmlFor="vp_at_meeting">Vice President
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="vp_at_meeting" id="vp_at_meeting"
                            defaultValue={defaultObj.officers_meeting_attendance["Vice President"]}
                        />
                    </label><br /><br />
                    <label htmlFor="sec_at_meeting">Secretary
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="sec_at_meeting" id="sec_at_meeting"
                            defaultValue={defaultObj.officers_meeting_attendance.Secretary}
                        />
                    </label><br /><br />
                    <label htmlFor="tres_at_meeting">Treasurer
                        <input
                            type="number"
                            onChange={handleAttendanceChange} 
                            name="tres_at_meeting" id="tres_at_meeting"
                            defaultValue={defaultObj.officers_meeting_attendance.Treasurer}
                        />
                    </label>
                </fieldset>

                <label htmlFor="extension_plans">Extension plans:<br />
                    <textarea
                        name="extension_plans" id=""
                        cols="30" rows="3"
                        defaultValue={defaultObj.extension_plans}
                        onChange={handleChange}
                    ></textarea>
                </label><br />
                <label htmlFor="problems">Problems:<br />
                    <textarea
                        name="problems" id=""
                        cols="30" rows="3"
                        defaultValue={defaultObj.problems}
                        onChange={handleChange}
                    ></textarea>
                </label><br />
                <label htmlFor="remarks">Remarks:<br />
                    <textarea
                        name="remarks" id=""
                        cols="30" rows="3"
                        defaultValue={defaultObj.remarks}
                        onChange={handleChange}
                    ></textarea>
                </label><br /><br />

                <label htmlFor="no_meetings_expected">
                    No. of meetings expected:
                    <input
                        type="number"
                        name="no_meetings_expected" id="no_meetings_expected"
                        onChange={handleChange}
                        defaultValue={defaultObj.no_meetings_expected}
                    />
                </label><br /><br />
                <label htmlFor="no_meetings_held">
                    No. of meetings held:
                    <input
                        type="number"
                        name="no_meetings_held" id="no_meetings_held"
                        onChange={handleChange}
                        defaultValue={defaultObj.no_meetings_held}
                    />
                </label><br /><br />
                <label htmlFor="avg_attendance">
                    Average attendance:
                    <input
                        type="number"
                        name="avg_attendance" id="avg_attendance"
                        onChange={handleChange}
                        defaultValue={defaultObj.avg_attendance}
                    />
                </label><br /><br />
                <label htmlFor="poor_attendance_reason">Problems:<br />
                    <textarea
                        name="poor_attendance_reason" id=""
                        cols="30" rows="3"
                        defaultValue={defaultObj.poor_attendance_reason}
                        onChange={handleChange}
                    ></textarea>
                </label><br />

                {/* Membership details  */}
                <fieldset>
                    <p>Membership Details</p>
                    <label htmlFor="senior_praesidia_membership">Senior praesidia:
                        <input
                            type="number"
                            name="senior_praesidia_membership" id="senior_praesidia_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0}
                        />
                    </label><br /><br />
                    <label htmlFor="junior_praesidia_membership">
                        Junior praesidia:
                        <input
                            type="number"
                            name="junior_praesidia_membership" id="junior_praesidia_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0}
                        />
                    </label><br /><br />
                    <label htmlFor="active_members_membership">
                        Active members:
                        <input
                            type="number"
                            name="active_members_membership" id="active_members_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="probationary_members_membership">
                        Probationary members:
                        <input
                            type="number"
                            name="probationary_members_membership" id="probationary_members_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0}  
                        />
                    </label><br /><br />
                    <label htmlFor="auxiliary_members_membership">
                        Auxiliary members:
                        <input
                            type="number"
                            name="auxiliary_members_membership" id="auxiliary_members_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="adjutorian_members_membership">
                        Adjutorian members:
                        <input
                            type="number"
                            name="adjutorian_members_membership" id="adjutorian_members_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="praetorian_members_membership">
                        Praetorian members:
                        <input
                            type="number"
                            name="praetorian_members_membership" id="praetorian_members_membership"
                            onChange={handleMembershipChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />

                </fieldset>

                {/* Achievements */}
                <fieldset>
                    <p>Achievements</p>
                    <label htmlFor="recruited_achievement">
                        No. recruited:
                        <input
                            type="number"
                            name="no_recruited_achievement" id="recruited_achievement"
                            onChange={handleAchievementChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="no_baptized_achievement">
                        No. baptized:
                        <input
                            type="number"
                            name="no_baptized_achievement" id="baptized_achievement"
                            onChange={handleAchievementChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="confirmed_achievement">
                        No. confirmed:
                        <input
                            type="number"
                            name="no_confirmed_achievement" id="confirmed_achievement"
                            onChange={handleAchievementChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />
                    <label htmlFor="communicants_achievement">
                        No. of first communicants:
                        <input
                            type="number"
                            name="no_first_communicants_achievement" id="communicants_achievement"
                            onChange={handleAchievementChange}
                            defaultValue={0} 
                        />
                    </label><br /><br />

                </fieldset>

                {/* legion fxns with attendance  */}
                <fieldset>
                    <table>
                        <thead>
                        <tr>
                            <td>Function Name</td>
                            <td>Date</td>
                            <td>Current Year</td>
                            <td>Previous Year</td>
                        </tr>
                        </thead>
                        <tbody>
                        {fxnNameAndTitle.map(itemPair => (
                            <FunctionRow 
                                key={itemPair[0]} 
                                name={itemPair[0]} 
                                title={itemPair[1]}
                                handler={handleFxnAttendanceChange}
                                fxnAttendance={fxnAttendance}
                            />
                        ))}
                        </tbody>
                    </table>
                </fieldset>

                <hr />
                <button type="submit">Save</button>
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}

export default ReportForm

// loader function 
export const reportFormLoader = async ({ params }) => {
    const { id } = params;     

    console.log("In financialRecords form loader", id);

    const obj = null; 
    let praesidia = [];
    let prepData = null;

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const praesidiaResponse = await axios.get(BASEURL + "praesidium/praesidium/", config);
            praesidia = praesidiaResponse.data;
            const pid = 1; 
            const startDate = '2024-8-10'; 
            const endDate = '2024-12-31'; 
            const prepDataResponse = await axios.get(BASEURL + `reports/get_report_prep_data?id=${pid}&startDate=${startDate}&endDate=${endDate}`, config); 
            prepData = prepDataResponse.data; 
        } else {
            console.log("Sign in to get meetings paradisei")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view meetings")
        } else {
            console.error("Error fetching meetings:", err);
        }
    } finally {
        return [obj, praesidia, prepData]; 
    }
}

// 
//     'id', 'praesidium', 'submission_date', 'last_submission_date',
//     'report_number', 'report_period', 'last_curia_visit_date',
//     'last_curia_visitors', 'officers_curia_attendance',
//     'officers_meeting_attendance', 'extension_plans',
//     'problems', 'remarks', 'no_meetings_expected',
//     'no_meetings_held', 'avg_attendance', 'poor_attendance_reason',
//     'membership_details', 'achievements' #, 'work_summary', 'financial_summary'
// ]
