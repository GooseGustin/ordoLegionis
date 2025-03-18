import axios from "axios"
import { NavLink, Link, useLoaderData } from "react-router-dom"
import { parseObjectKeys } from "../../../functionVault";

const BASEURL = "http://localhost:8000/api/";


const ReportList = () => {
    const [praesidium, reports] = useLoaderData();
    // const membershipKeys = parseObjectKeys(reports.membership); 
    // const achievementKeys = parseObjectKeys(report)



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
                    <NavLink className="nav-link" to='create'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">New report</span>
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
                {reports.map(report => (
                    <div className="row border border-dark rounded rounded-3 p-3 my-2" key={report.id}>
                        <div className="col-8">
                            <Link className="fs-4 text-decoration-none text-dark" to={`${report.id}`}>Report {report.report_number}</Link>
                        </div>
                        
                    </div>
                ))}
                
                </div> 
            </main>
        </div>
    )
}

export default ReportList


export const reportListLoader = async ({ params }) => {
    const {pid} = params;
    const loc = "In the report list loader fxn";
    let praesidium; 
    let reports = [];

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
            const praesidiumResponse = await axios.get(BASEURL+ `praesidium/praesidium/${pid}`, config);
            // const meetingsResponse = await axios.get(BASEURL + `meetings/meetings/?pid=${pid}`, config); 
            
            // meetings = meetingsResponse.data; 
            praesidium = praesidiumResponse.data; 

            for (let i in praesidium.reports) {
                const rid = praesidium.reports[i]; 
                const reportResponse = await axios.get(BASEURL + `reports/report/${rid}`, config); 
                let report = reportResponse.data; 
                // const membershipResponse = await axios.get(BASEURL + `reports/membership/${report.membership_details}`)
                // report.membership = membershipResponse.data; 
                // const achievementResponse = await axios.get(BASEURL + `reports/achievement/${report.achievements}`)
                // report.achievement = achievementResponse.data; 

                reports.push(report); 
            }

            // // Add the curia details to the praesidium data
            // praesidium.curiaDetails = curiaResponse.data;


        } else {
            console.log("Sign in to get workLists")
        }

    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching workLists or praesidium:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        return [praesidium, reports]; 
    }

}