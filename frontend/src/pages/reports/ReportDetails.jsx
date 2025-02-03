import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

export const ReportDetails = () => {
    const [report, _] = useLoaderData(); 
    console.log("in details", report)
    const praesidiumName = report.praesidiumDetails.name; 
    // let deadline = report.deadline;
    // if (report.deadline == '1777-01-01') {
    //     deadline = null; 
    // } 

    const navigate = useNavigate(); 

    const deleteReport = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the report');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/reports/reports/"+report.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the report")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this report")
            } else {
                console.error("Error deleting the report:", err);
            }
        }
    }
    
    if (!report) {
        return (
            <div>
                You are logged out. Please sign in to view this content.
                <br />
                <Link to="../../login">Login</Link>
            </div>
        )
    } 

    return (
        <div className="report-details">

        </div>
    )
}



// fields = [
//     'praesidium', 'submission_date', 'last_submission_date', 
//     'report_number', 'report_period', 'last_curia_visit_date', 
//     'last_curia_visitors', 'officers_curia_attendance', 
//     'officers_report_attendance', 'extension_plans', 
//     'problems', 'remarks', 'no_reports_expected', 
//     'no_meetings_held', 'avg_attendance', 'poor_attendance_reason'
// ]

