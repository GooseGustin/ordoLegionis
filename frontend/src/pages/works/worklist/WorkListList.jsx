import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom'

const BASEURL = "http://127.0.0.1:8000/api/";

const WorkListList = () => {
    const [workLists, praesidia, errStatus] = useLoaderData(); 

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view workLists.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    const workListToPraesidium = (workList) => {
        const praes = praesidia.filter(
            function (p) { return p.id === workList.praesidium }
            )
        // console.log('In workListToPraesidium', praes, workList.praesidium, workList.details);
        return praes[0]? praes[0].name : null;
    }

    return (
        <div className="worklist-list">
            {workLists.map(workList =>
            (
                <Link to={workList.id.toString()} key={workList.id}>
                    <p>{workListToPraesidium(workList)} worklist</p>
                </Link>
            ))}  
        </div>
    )
}

export default WorkListList

// loader function 
export const workListListsLoader = async () => {
    let worklists = []; 
    let praesidia = []; 
    let errorStatus = null; 
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            // console.log('Get the workLists');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            };
            const workListResponse = await axios.get(BASEURL + "works/work_list/", config); 
            // console.log('WorkLists response', response.data)
            // setWorkLists(response.data)
            worklists = workListResponse.data 
            const praesidiaResponse = await axios.get(BASEURL + "praesidium/praesidium/", config); 
            // console.log("Praesidia response", response2.data)
            // setPraesidia(response2.data) 
            praesidia = praesidiaResponse.data 
        } else {
            console.log("Sign in to get workLists")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view workLists")
            // setErrStatus(401); 
            errorStatus = 401;
        } else {
            console.error("Error fetching workLists or praesidia:", err);                    
            errorStatus = err.status; 

        }
    } finally {
        return [worklists, praesidia, errorStatus]; 
    }
}

