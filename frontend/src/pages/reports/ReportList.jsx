import axios from 'axios';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom'

const BASEURL = "http://127.0.0.1:8000/api/"; 

const ReportList = () => {
    const [finRecList, errStatus] = useLoaderData();
    const [reportsList, setReportsList] = useState(finRecList);
    console.log('Reports list', reportsList);

    const deleteReport = async (id) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the workList');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete(BASEURL+"reports/report/"+id+"/", config); 
                console.log("Successfully deleted"); 
                // navigate("../")
                const updatedReportsList = reportsList.filter(function (exp) {
                    return exp.id !== id;
                })
                setReportsList(updatedReportsList);
            }  else {
                console.log("Sign in to delete the workList")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this workList")
            } else {
                console.error("Error deleting the workList:", err);
            }
        }
    }

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view reports.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    return (
        <div className="report-list">
            {reportsList.map(report => 
                (
                    <Link to={report.id.toString()} key={report.id}>
                        Financial Record of Praesidium with ID {report.praesidium}<br />
                    </Link>
                )  
            )}  
        </div>
    )
}

export default ReportList

export const reportsListLoader = async () => {
    const loc = 'In reports list loader'; 
    console.log(loc); 
    let reportsList = []; 
    let errorStatus = null; 
    
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the reports');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get(BASEURL + "reports/report", config); 
            // console.log('Report response', response.data)
            reportsList = response.data; 
        } else {
            console.log("Sign in to get reports")
            throw new Error("The session is expired, login again")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view reports")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching reports:", err);                    
        }
        errorStatus = err.status; 
    } finally {
        return [reportsList, errorStatus]
    }
}