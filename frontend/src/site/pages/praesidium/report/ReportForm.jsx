import { NavLink, Link, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate, parseObjectKeys } from "../../../functionVault";

const BASEURL = "http://localhost:8000/api/";

const ReportForm = ({ method }) => {
    const [praesidium, report, prepDataInit] = useLoaderData();
    const loc = "In report form";
    console.log(loc, 'method', method)

    const [prepData, setPrepData] = useState(prepDataInit); 

    const defaultSubmissionDate = report? report.submission_date: null 
    const defaultLastSubmisisonDate = report? report.last_submission_date: null
    const defaultReportNumber = report? report.report_number: 1
    const defaultReportPeriod = report? report.report_period: 0
    const defaultLastCuriaVisitDate = report? report.last_curia_visit_date: null;
    const defaultLastCuriaVisitors = report? report.last_curia_visitors: '';
    const defaultCuriaAttendance = report
        ? report.officers_curia_attendance
        : {
            "President": 0,
            "Vice President": 0,
            "Secretary": 0,
            "Treasurer": 0
        };
    const defaultMeetingAttendance = report
        ? report.officers_meeting_attendance
        : {
            "President": 0,
            "Vice President": 0,
            "Secretary": 0,
            "Treasurer": 0
        };
    const defaultExtensionPlans = report? report.extension_plans: ''
    const defaultProblems = report? report.problems: ''
    const defaultRemarks = report? report.remarks: ''
    const defaultMeetingsExpected = report? report.no_meetings_expected: 0
    const defaultMeetingsHeld = report? report.no_meetings_held: 0
    const defaultAvgAttendance = report? report.avg_attendance: 0
    const defaultPoorAttendanceReason = report? report.poor_attendance_reason: ''
    const defaultMembership = report? report.membership_details: {
        "senior_praesidia": 0,
        "junior_praesidia": 0,
        "active_members": 0,
        "probationary_members": 0,
        "auxiliary_members": 0,
        "adjutorian_members": 0,
        "praetorian_members": 0
    };
    const defaultAchievements = report? report.achievement: {
        "no_recruited": 0,
        "no_baptized": 0,
        "no_confirmed": 0,
        "no_first_communicants": 0,
        "no_married": 0, 
        "no_converted": 0, 
        "no_vocations": 0,
        "others": {
            "No. who took Legion promise": 2
        }
    };

    const initialFxnAttendances = [
        {
            "name": "Acies",
            "date": null,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "May Devotion",
            "date": "2024-05-01",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Edel Quinn Mass",
            "date": "2024-05-12",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Annual Enclosed Retreat",
            "date": null,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Mary's Birthday",
            "date": "2024-09-08",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "October Devotion",
            "date": "2024-10-01",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Departed Legionaries' Mass",
            "date": "2024-11-02",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Frank Duff Mass",
            "date": "2024-11-12",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        },
        {
            "name": "Annual General Reunion",
            "date": null,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
        }
    ]
    const defaultFxnAttendance = (report && report.fxn_attendances)? 
        report.fxn_attendances[0]? 
            report.fxn_attendances: 
            initialFxnAttendances: 
        initialFxnAttendances

    const [reportFormData, setReportFormData] = useState({
        praesidium: praesidium.id, 
        submission_date: defaultSubmissionDate, 
        last_submission_date: defaultLastSubmisisonDate, 
        report_number: defaultReportNumber, 
        report_period: defaultReportPeriod, 
        last_curia_visit_date: defaultLastCuriaVisitDate, 
        last_curia_visitors: defaultLastCuriaVisitors, 
        officers_curia_attendance: defaultCuriaAttendance, 
        officers_meeting_attendance: defaultMeetingAttendance, 
        extension_plans: defaultExtensionPlans, 
        problems: defaultProblems, 
        remarks: defaultRemarks, 
        no_meetings_expected: defaultMeetingsExpected, 
        no_meetings_held: defaultMeetingsHeld, 
        avg_attendance: defaultAvgAttendance, 
        poor_attendance_reason: defaultPoorAttendanceReason, 
        membership_details: defaultMembership, 
        achievements: defaultAchievements, 
        function_attendances: defaultFxnAttendance,
        work_summaries: prepData.work_summaries, 
        financial_summary: prepData.financial_summary
        // report_production: defaultReportProduction
    })
    console.log("\ninitial report", reportFormData); 
    
    const otherAchievements = defaultAchievements.others; 
    const otherAchievementsKeys = parseObjectKeys(otherAchievements);
    
    let workSummaries = prepData.work_summaries; 
    for (let i in workSummaries) {
        let item = workSummaries[i]; 
        item.id = i;
    }
    
    let financialSummary = prepData.financial_summary
    for (let i in financialSummary) {
        let item = financialSummary[i]; 
        item.id = i;
    }
    
    const sampleFinSummary = financialSummary[0];
    let expenditureKeys = parseObjectKeys(sampleFinSummary ? sampleFinSummary['expenses']: {}).slice(0,-1);
    let expenditureLen = expenditureKeys.length;
    // console.log('expenditure len', expenditureKeys, expenditureLen)
    // let reportCopy = reportFormData

    const handleAutoFill = async () => {
        const startDate = reportFormData.last_submission_date;
        const endDate = reportFormData.submission_date; 
        console.log("Start and end dates", startDate, endDate);
        const packet = {
            pid: praesidium.id, 
            startDate: startDate, 
            endDate: endDate
        }
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                const prepDataResponse = await axios.post(BASEURL+'reports/get_report_prep_data', packet, config)
                const prepData = prepDataResponse.data;
                setPrepData(prepData); 
                setReportFormData({
                    ...reportFormData, 
                    ...prepData,
                    last_submission_date: startDate, 
                    submission_date: endDate
                })
                console.log("Updated prep data", prepData)

                workSummaries = prepData.work_summaries; 
                for (let i in workSummaries) {
                    let item = workSummaries[i]; 
                    item.id = i;
                }
                
                financialSummary = prepData.financial_summary
                for (let i in financialSummary) {
                    let item = financialSummary[i]; 
                    item.id = i;
                }
                
                const sampleFinSummary = financialSummary[0];
                expenditureKeys = parseObjectKeys(sampleFinSummary ? sampleFinSummary['expenses']: {}).slice(0,-1);
                expenditureLen = expenditureKeys.length;
                console.log('expenditure len', expenditureKeys, expenditureLen)
            }   
        } catch (err) {
            console.log("Error on autofill", err)
        }
        
    }

    const handleReportChange = (e) => {
        const value = isNaN(e.target.value*1) ? e.target.value: e.target.value*1;
        setReportFormData({
            ...reportFormData,
            [e.target.name]: value
        })
        console.log("Handled report change", e.target.name, e.target.value, reportFormData); 
    }

    const handleFinanceChange = (e) => {
        console.log("Handle finance change", e.target.name, e.target.value);
        const targetName = e.target.name;
        const [year, month, title] = targetName.split('__'); 
        console.log(month, year, title)

        // find index in financial_summary 
        let ind; 
        for (let i in reportFormData.financial_summary) {
            const item = reportFormData.financial_summary[i]; 
            if (item.month==month && item.year==year) {
                ind = i
            } else {
                console.log("Incorrect summary", item.month, item.year)
            }
        }
        console.log("ind", ind)
        // update value
        let financialSummaryCopy = reportFormData.financial_summary; 
        
        switch (title) {
            case 'bf':
            case 'sbc': 
            case 'balance': 
            case 'remittance':
                financialSummaryCopy[ind][title] = e.target.value * 1; 
                break;
            default: 
                financialSummaryCopy[ind]['expenses'][title] = e.target.value * 1; 
                break;
        }

        setReportFormData({
            ...reportFormData, 
            financial_summary: financialSummaryCopy
        })
        console.log("financial summary updated", financialSummaryCopy[ind]); 

    }

    const handleAttendanceChange = (e) => {
        const loc = "In handle attendance";
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
            setReportFormData({
                ...reportFormData, 
                officers_meeting_attendance: {
                    ...reportFormData.officers_meeting_attendance,
                    [officeName]: e.target.value*1
                }
            }); 
            console.log(loc, reportFormData.officers_meeting_attendance)

        } else if (council == 'curia') { // If curia meeting
            setReportFormData({
                ...reportFormData, 
                officers_curia_attendance: {
                    ...reportFormData.officers_curia_attendance,
                    [officeName]: e.target.value*1
                }
            })
            console.log(loc, reportFormData.officers_curia_attendance)
        }
    }

    const handleFxnAttendanceChange = (e) => {
        const loc = "Handle fxn attendance change"; 
        const [targetName, key] = e.target.name.split('__'); 
        console.log(loc, targetName)

        // find index of changed fxn
        let ind; 
        for (let i in reportFormData.function_attendances) {
            if (reportFormData.function_attendances[i]['name']==targetName) {
                ind = i;
            }
        }

        // create and update copy of fxn attendance
        const value = isNaN(e.target.value*1) ? e.target.value: e.target.value*1;
        let functionAttendancesCopy = reportFormData.function_attendances; 
        functionAttendancesCopy[ind] = {
            ...functionAttendancesCopy[ind], 
            [key]: value
        }

        // update actual record
        setReportFormData({
            ...reportFormData, 
            function_attendances: functionAttendancesCopy
        })

        console.log(loc, functionAttendancesCopy[ind]);

    }

    const handleMembershipChange = (e) => {
        console.log("In membership change", e.target.name, e.target.value)
        setReportFormData({
            ...reportFormData, 
            membership_details: {
                ...reportFormData.membership_details,
                [e.target.name]: e.target.value*1
            }
        });
        console.log(reportFormData.membership_details)
    }

    const handleAchievementChange = (e) => {
        const targetName = e.target.name; 
        console.log('target name', targetName)
        const othersTag = targetName.substring(targetName.lastIndexOf("_")+1); 
        const name = targetName.substring(0, targetName.lastIndexOf("_")); 

        // const [name, othersTag] = e.target.name.split('_'); 
        console.log("In achievement change", name, othersTag, e.target.value)
        if (othersTag==='others' && name!=='no') {
            setReportFormData({
                ...reportFormData, 
                achievements: {
                    ...reportFormData.achievements,
                    others: {   
                        ...reportFormData.achievements.others,
                        [name]: e.target.value*1
                    }
                }
            });
        } else {
            setReportFormData({
                ...reportFormData, 
                achievements: {
                    ...reportFormData.achievements,
                    [targetName]: e.target.value*1
                }
            });
        }
        console.log(reportFormData.achievements)
    }

    const handleWorkChange = (e) => {
        const loc = "Handle work change"; 
        const [targetName, metric] = e.target.name.split('__'); 
        console.log(loc, targetName, metric)

        // find index of changed work 
        let ind; 
        for (let i in reportFormData.work_summaries) {
            if (reportFormData.work_summaries[i]['type'] == targetName) {
                ind = i; 
            }
        }

        // create and update summary copy 
        let workSummariesCopy = reportFormData.work_summaries; 
        
        switch (metric) {
            case 'no_done':
            case 'no_assigned': 
                workSummariesCopy[ind][metric] = e.target.value * 1; 
                break;
            default: 
                workSummariesCopy[ind]['details'][metric] = e.target.value * 1; 
                break;
        }

        setReportFormData({
            ...reportFormData, 
            work_summaries: workSummariesCopy
        })

        console.log(loc, workSummariesCopy[ind]);
    }

    const handleReportSubmission = async (e) => {
        e.preventDefault()
        const loc = "In handle report submission"; 
        
        
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                console.log(loc, reportFormData);
                if (method == 'create') {
                    // create achievement [single pk]
                    const achievementResponse = await axios.get(
                        BASEURL + `reports/achievement/`, 
                        reportFormData.achievements,
                        config)
                    reportFormData.achievements = achievementResponse.data.id; 

                    // create membership details  [list of single index]
                    const membershipDetailReponse = await axios.post(
                        `${BASEURL}reports/membership/`, 
                        reportFormData.membership_details, 
                        config
                        )
                    const membershipDetail = membershipDetailReponse.data; 

                    // create financial summary []

                    // create work summaries
                    // post 
                    const reportResponse = await axios.post(
                        BASEURL + "reports/report/", 
                        {
                            ...reportFormData, 
                            membership_details:membershipDetail.id
                        },
                        config
                        )
                } else if (method == 'edit') {
                    // put 
                    const reportResponse = await axios.put(BASEURL + `reports/report/${report.id}/`, reportFormData, config)
                }
                const reportData = reportResponse.data; 
                
                const updatedReport = {
                    ...reportFormData,
                    ...reportData.data
                }
                console.log("Updated report", updatedReport);
                setReportFormData(updatedReport)
                
            }
        } catch (err) {
            console.log("Error on autofill", err)
        }
    }

    const btnTitle = method == 'create' ? "Create" : "Edit";

    return (
        <div className='report-form pt-5'>
            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='../../'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Praesidium</span>
                    </NavLink>

                    {/* help  */}
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
            {/* main content */}
            <div className="main-content">
                <p className="fs-4">Praesidium: {praesidium.name}</p>
                <form onSubmit={handleReportSubmission}>

                {/* History */}
                <div className="row row-cols-lg-3 row-cols-md-3">
                    <div className="row col col-12 border border-dark rounded rounded-3 p-3 my-2">
                    <div className="col col-lg-5 col-md-4 me-md-2 col-sm-12">
                        <label htmlFor="last_submission_date">
                        Last submission date: <input
                                type="date" name='last_submission_date'
                                id='date' className='form-control border border-dark '
                                onChange={handleReportChange}
                                defaultValue={defaultLastSubmisisonDate}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-4 col-md-4 me-md-2 col-sm-12">
                        <label htmlFor="submission_date">
                        Submission date: <input
                                type="date" name='submission_date'
                                id='date' className='form-control  border border-dark '
                                onChange={handleReportChange}
                                defaultValue={defaultSubmissionDate}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-2 col-md-3 col-sm-12 mt-lg-4 mt-md-4">
                        <button className="btn btn-primary" onClick={handleAutoFill} type="button">Auto fill</button>
                    </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="report_number">
                            <span className="me-1">Report no.</span>
                            <input
                                type="number"
                                name="report_number" id="report_number"
                                className='form-control-sm rounded rounded-3  border border-dark '
                                onChange={handleReportChange}
                                value={reportFormData.report_number} 
                            />
                        </label>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="report_period">
                            <span className="me-1">Report period (weeks)</span>
                            <input
                                type="number"
                                name="report_period" id="report_period"
                                className='form-control-sm rounded rounded-3 border border-dark '
                                onChange={handleReportChange}
                                value={reportFormData.no_meetings_expected} 
                            />
                        </label>
                    </div>
                </div>

                {/* Curia */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Curia</p>
                    <hr />
                    <p className="fs-4">Visiting</p>
                    <div className="col">
                        <label htmlFor="last_curia_visit_date">
                        Date of last visit by curia: <input
                                type="date" name='last_curia_visit_date'
                                id='date' className='form-control border border-dark '
                                onChange={handleReportChange}
                                defaultValue={defaultLastCuriaVisitDate}
                            />
                        </label>
                    </div>
                    <div className="col-12">
                        <label htmlFor="last_curia_visitors">
                            Names and praesidia of curia visitors: 
                        </label>
                        <textarea 
                            name="last_curia_visitors" id="" 
                            // cols="30" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultLastCuriaVisitors}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
                    
                    <hr className="mt-4" />
                    <p className="fs-4">Officers Attendance</p>
                    <div className="row row-cols-lg-2 row-cols md-2">
                        <div className="col">
                            <label htmlFor="acf"><span className="me-1">President</span>
                                <input 
                                    type="number" name="pres_at_curia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_curia_attendance['President']} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="sbc"><span className="me-1">Vice President</span>
                                <input 
                                    type="number" name="vp_at_curia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_curia_attendance["Vice President"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="sec_at_curia"><span className="me-1">Secretary</span>
                                <input 
                                    type="number" name="sec_at_curia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_curia_attendance["Secretary"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="tres_at_curia"><span className="me-1">Treasurer</span>
                                <input 
                                    type="number" name="tres_at_curia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_curia_attendance["Treasurer"]} 
                                />
                            </label>
                        </div>

                    </div>

                </div>

                {/* Praesidium */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Praesidium</p>
                    <div className="row row-cols-lg-2 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="acf"><span className="me-1">No. of meetings expected</span>
                                <input 
                                    type="number" name="no_meetings_expected" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleReportChange}
                                    value={reportFormData.no_meetings_expected}
                                    // defaultValue={defaultMeetingsExpected} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="sbc"><span className="me-1">No. of meetings held</span>
                                <input 
                                    type="number" name="no_meetings_held" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleReportChange}
                                    value={reportFormData.no_meetings_held} 
                                />
                            </label>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <p className="fs-4">Officers Attendance</p>
                    <div className="row row-cols-lg-2 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="acf"><span className="me-1">President</span>
                                <input 
                                    type="number" name="pres_at_meeting" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_meeting_attendance["President"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="sbc"><span className="me-1">Vice President</span>
                                <input 
                                    type="number" name="vp_at_meeting" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_meeting_attendance["Vice President"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="balance"><span className="me-1">Secretary</span>
                                <input 
                                    type="number" name="sec_at_meeting" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_meeting_attendance["Secretary"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="balance"><span className="me-1">Treasurer</span>
                                <input 
                                    type="number" name="tres_at_meeting" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAttendanceChange}
                                    value={reportFormData.officers_meeting_attendance["Treasurer"]} 
                                />
                            </label>
                        </div>

                    </div>
                    
                    <div className="col mt-3">
                        <label htmlFor="acf"><span className="me-1">Average attendance</span>
                            <input 
                                type="number" name="avg_attendance" id=""
                                className='form-control-sm rounded rounded-3 border border-dark'
                                onChange={handleReportChange}
                                value={reportFormData.avg_attendance} 
                            />
                        </label>
                    </div>
                    
                    <div className="col-12">
                        <label htmlFor="poor_attendance_reason">
                            Reasons for poor attendance: 
                        </label>
                        <textarea 
                            name="poor_attendance_reason" id="" 
                            className="form-control border border-dark"
                            rows="1"
                            defaultValue={defaultPoorAttendanceReason}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
                    
                    <div className="col-12 mt-1">
                        <label htmlFor="extension_plans">
                            Extension plans: 
                        </label>
                        <textarea 
                            name="extension_plans" id="" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultExtensionPlans}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
{/*                     
                    <div className="col-12 mt-1">
                        <label htmlFor="problems">
                            Problems: 
                        </label>
                        <textarea 
                            name="problems" id="" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultProblems}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
                    
                    <div className="col-12 mt-1">
                        <label htmlFor="remarks">
                            Remarks: 
                        </label>
                        <textarea 
                            name="remarks" id="" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultRemarks}
                            onChange={handleReportChange}
                        ></textarea>
                    </div> */}
                </div>
                
                {/* Membership */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Membership</p>
                    <div className="row row-cols-lg-2 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="senior_praesidia"><span className="me-1">Senior praesidia</span>
                                <input 
                                    type="number" name="senior_praesidia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["senior_praesidia"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="junior_praesidia"><span className="me-1">Junior praesidia</span>
                                <input 
                                    type="number" name="junior_praesidia" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["junior_praesidia"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="active_members"><span className="me-1">Active members</span>
                                <input 
                                    type="number" name="active_members" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["active_members"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="probationary_members"><span className="me-1">Probationary members</span>
                                <input 
                                    type="number" name="probationary_members" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["probationary_members"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="auxiliary_members"><span className="me-1">Auxiliary members</span>
                                <input 
                                    type="number" name="auxiliary_members" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["auxiliary_members"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="adjutorian_members"><span className="me-1">Adjutorian members</span>
                                <input 
                                    type="number" name="adjutorian_members" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["adjutorian_members"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="praetorian_members"><span className="me-1">Praetorian members</span>
                                <input 
                                    type="number" name="praetorian_members" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleMembershipChange}
                                    defaultValue={defaultMembership["praetorian_members"]} 
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Achievements</p>
                    <div className="row row-cols-lg-2 row-cols-md-2">
                        <div className="col">
                            <label htmlFor="no_recruited"><span className="me-1">No. recruited</span>
                                <input 
                                    type="number" name="no_recruited" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_recruited"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_baptized"><span className="me-1">No. baptized</span>
                                <input 
                                    type="number" name="no_baptized" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_baptized"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_confirmed"><span className="me-1">No. confirmed</span>
                                <input 
                                    type="number" name="no_confirmed" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_confirmed"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_first_communicants"><span className="me-1">No. of first communicants</span>
                                <input 
                                    type="number" name="no_first_communicants" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_first_communicants"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_married"><span className="me-1">No. of marriage solemnizations</span>
                                <input 
                                    type="number" name="no_married" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_married"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_vocations"><span className="me-1">No. entering into vocations</span>
                                <input 
                                    type="number" name="no_vocations" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_vocations"]} 
                                />
                            </label>
                        </div>
                        <div className="col">
                            <label htmlFor="no_converted"><span className="me-1">No. converted to Christianity/Catholicism</span>
                                <input 
                                    type="number" name="no_converted" id=""
                                    className='form-control-sm rounded rounded-3 border border-dark'
                                    onChange={handleAchievementChange}
                                    defaultValue={defaultAchievements["no_converted"]} 
                                />
                            </label>
                        </div>
                        
                        
                        {
                            // Other achievements
                            otherAchievementsKeys.map(item => (
                                <div className="col" key={item}>
                                    <label htmlFor={item + '_others'}><span className="me-1">{item}</span>
                                        <input 
                                            type="number" name={item + '_others'} id=""
                                            className='form-control-sm rounded rounded-3 border border-dark'
                                            onChange={handleAchievementChange}
                                            defaultValue={defaultAchievements["others"][item]} 
                                        />
                                    </label>
                                </div>
                            ))
                        }

                        <div className="row col-12 border mx-auto">
                            <div className="col">
                                <label htmlFor="others_name"><span className="me-1">Others</span>
                                    <input 
                                        type="text" name="others_name" id=""
                                        className='form-control-sm rounded rounded-3 border border-dark'
                                        onChange={handleAchievementChange}
                                    />
                                </label>
                            </div>
                            <div className="col">
                                <label htmlFor="others_value"><span className="me-1">Number</span>
                                    <input 
                                        type="number" name="others_value" id=""
                                        className='form-control-sm rounded rounded-3 border border-dark'
                                        onChange={handleAchievementChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Works */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Works</p>
                    {
                        workSummaries.map(summary => {
                            // console.log('check 3', summary.type); 
                            return (
                                <>
                                <div className="row row-cols-lg-2 row-cols-md-2 border mx-1 p-3" key={summary.id}>
                                <div className="col-12">
                                    {/* title */}
                                    <p className="fs-4">
                                        {summary.type} 
                                        {summary.active? (
                                            <>
                                                <span className="mx-3">|</span>
                                                <span className="fs-6 text-primary"> Active</span>
                                            </>
                                            ): (<></>)}
                                    </p>
                                </div>
                                <div className="col-6">
                                <label htmlFor="no_assigned"><span className="me-1">No. assigned</span>
                                        <input 
                                            type="number" name={summary.type + "__no_assigned"} id=""
                                            className='form-control-sm rounded rounded-3 border border-dark'
                                            onChange={handleWorkChange}
                                            efaultValue={summary.no_assigned}
                                        />
                                    </label>
                                </div>
                                
                                <div className="col-6">
                                <label htmlFor="no_done"><span className="me-1">No. done</span>
                                        <input 
                                            type="number" name={summary.type + "__no_done"} id=""
                                            className='form-control-sm rounded rounded-3 border border-dark'
                                            onChange={handleWorkChange}
                                            defaultValue={summary.no_done}
                                        />
                                    </label>
                                </div>

                                {
                                    parseObjectKeys(summary.details).map(item => {
                                        return (
                                            <div className="col" key={item}>
                                                <label htmlFor={`${summary.type}__${item}`}>
                                                    <span className="me-1">{item}</span>
                                                    <input 
                                                        type="number" 
                                                        name={`${summary.type}__${item}`} id="" 
                                                        className="form-control border border-dark"
                                                        defaultValue={summary.details[item]}
                                                        onChange={handleWorkChange}
                                                    />
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                </>
                            )
                        })
                    }
                </div>

                {/* Function attendances */}
                <div className="fxn-attendance row  p-3 my-2">
                    <p className="fs-3">Legion Functions with Attendance</p>
                    <table className="table border border-dark">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Current year</th>
                            <th>Previous year</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            defaultFxnAttendance.map(fxn => (
                                <tr>
                                    <td>{fxn.name}</td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name={fxn.name + "__date"} id="" 
                                            className="form-control border border-dark rounded rounded-3"
                                            defaultValue={fxn.date}
                                            onChange={handleFxnAttendanceChange}
                                        />
                                    </td>
                                    <td>
                                        <input type="number" 
                                            name={fxn.name + "__current_year_attendance"} id="" 
                                            className="form-control border border-dark rounded rounded-3"
                                            defaultValue={fxn.current_year_attendance}
                                            onChange={handleFxnAttendanceChange}
                                            />
                                    </td>
                                    <td>
                                        <input type="number" 
                                            name={fxn.name + "__previous_year_attendance"} id="" 
                                            className="form-control border border-dark rounded rounded-3"
                                            defaultValue={fxn.previous_year_attendance}
                                            onChange={handleFxnAttendanceChange}
                                            />
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                {/* Finance */}
                <div className="finance row  p-3 my-2">
                    <p className="fs-3">Finance</p>
                    <table className="table table-bordered">
                        <thead className="">
                        <tr>
                            <th></th>
                            <th colSpan={2} className="text-center">Income</th>
                            <th colSpan={expenditureLen+1} className="text-center">Expenditure</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th className="text-center">Month</th>
                            <th className="text-center">BF</th>
                            <th className="text-center">SBC</th>
                            <th colSpan={expenditureLen} className="text-center">To Praesidium</th>
                            <th className="text-center">To Curia</th>
                            <th className="text-center">Balance</th>
                        </tr>
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center"></th>
                            <th className="text-center"></th>

                            {/* <th colSpan={expenditureLen} >To Praesidium</th> */}
                            {
                                expenditureKeys.map(item => {
                                    // console.log("Check 1", item)
                                    return (<th key={item} className="text-center">{item}</th>)
                                })
                            }
                            <th className="text-center"></th>
                            <th className="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                financialSummary.map(item => {
                                    // console.log("Check 2", item);
                                    return (
                                    <tr key={item.id}>
                                        <th>{item.month}, {item.year}</th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'bf'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.bf}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'sbc'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.sbc}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'bouquet'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.expenses.bouquet}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'stationery'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.expenses.stationery}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'altar'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.expenses.altar}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'extension'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.expenses.extension}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        {/* <th>
                                            <input 
                                                type="number" 
                                                name="" id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.expenses.others}
                                            />
                                        </th> */}
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'remittance'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.remittance}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                        <th>
                                            <input 
                                                type="number" 
                                                name={item.year+'__'+item.month+'__'+'balance'} id="" 
                                                className="form-control border border-dark rounded rounded-3"
                                                defaultValue={item.balance}
                                                onChange={handleFinanceChange}
                                            />
                                        </th>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* Comments */}
                <div className="row border border-dark rounded rounded-3 p-3 my-2">
                    <p className="fs-3">Comments</p>
                    <div className="col-12 mt-1">
                        <label htmlFor="problems">
                            Problems: 
                        </label>
                        <textarea 
                            name="problems" id="" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultProblems}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
                    
                    <div className="col-12 mt-1">
                        <label htmlFor="remarks">
                            Remarks: 
                        </label>
                        <textarea 
                            name="remarks" id="" 
                            className="form-control border border-dark"
                            rows="2"
                            defaultValue={defaultRemarks}
                            onChange={handleReportChange}
                        ></textarea>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-6">
                        <button type="submit" className="btn btn-outline-success col-12 rounded rounded-5">{btnTitle}</button>
                    </div>
                    <div className="col">
                        <Link to="../../" className="btn btn-outline-primary col-12 rounded rounded-5">Cancel</Link>
                    </div>
                </div>

                </form>



            </div>
        </div>
    )
}

export default ReportForm


export const reportFormLoader = async ({ params }) => {
    const {pid, rid} = params;
    const loc = "In the report form loader fxn";
    console.log(loc, 'pid', pid);
    let praesidium, report, workList, prepData; 

    // console.log(loc); 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            console.log(loc, pid); 
            const praesidiumResponse = await axios.get(BASEURL+ `praesidium/praesidium/${pid}`, config);
            praesidium = praesidiumResponse.data; 

            if (rid) {
                const reportResponse = await axios.get(BASEURL + `reports/report/${rid}`, config); 
                report = reportResponse.data; 
                const membershipResponse = await axios.get(BASEURL + `reports/membership/${report.membership_details}`)
                report.membership = membershipResponse.data; 
                const achievementResponse = await axios.get(BASEURL + `reports/achievement/${report.achievements.id}`)
                report.achievement = achievementResponse.data; 
                report.fxn_attendances = [];
                for (let i in report.function_attendances) {
                    const fxnInd = report.function_attendances[i].id;
                    const attendanceResponse = await axios.get(BASEURL + `reports/attendance/${fxnInd}`, config);
                    report.fxn_attendances.push(attendanceResponse.data); 
                }
            }

            const workListResponse = await axios.get(`${BASEURL}works/work_list/?pid=${pid}`, config);
            workList = workListResponse.data; 

            // Get prepData: 
            const packet = {
                pid: pid
            }
            const prepDataResponse = await axios.post(BASEURL + "reports/get_report_prep_data", packet, config);
            prepData = prepDataResponse.data;
            console.log(loc, 'prepdata', prepData)


        } else {
            console.log("Sign in to get workSummary")
        }

    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workSummarys")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching worksummary or praesidium:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        console.log(loc, 'report', report);

        return [praesidium, report, prepData]; 
    }

}

