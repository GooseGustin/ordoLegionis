import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom'

const BASEURL = "http://127.0.0.1:8000/api/"; 

const WorkList = () => {
    const [workList, errStatus] = useLoaderData();

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view works.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    return (
        <div className="work-list">
            {workList.map(work => 
                (
                    <Link to={work.id.toString()} key={work.id}>
                        Work {work.type} of Meeting ID {work.meeting}<br />
                    </Link>
                )  
            )}  
        </div>
    )
}

export default WorkList

export const worksListLoader = async () => {
    const loc = 'In works list loader'; 
    console.log(loc); 
    let worksList = []; 
    let errorStatus = null; 
    
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the works');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get(BASEURL+"works/work/", config); 
            // console.log('Work response', response.data)
            worksList = response.data; 
        } else {
            console.log("Sign in to get works")
            throw new Error("The session is expired, login again")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view works")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching works:", err);                    
        }
        errorStatus = err.status; 
    } finally {
        return [worksList, errorStatus]
    }
}