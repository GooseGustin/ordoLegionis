import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

function parseObjectKeys(someObj) {
    let keys = []; 
    for (let key in someObj) {
        keys.push(key); 
    }
    return keys; 
}

function allFalseMetrics(obj) {
    for (let item in obj) {
        if (obj[item]) {
            return true; 
        }
    }
    return false 
}

const RenderDetails = ({ name, metrics }) => {
    // console.log('In work list details render details', metrics)
    const metricsKeys = parseObjectKeys(metrics); 
    const workIsSelected = allFalseMetrics(metrics);
    // console.log('check 1', workIsSelected); 
    return (
        <>
        {workIsSelected? (<h4>{name}</h4>): (<></>)}
        <ul>
            {metricsKeys.map(item => {
                if (metrics[item]) {
                    return (<li key={item}>{item}</li>)
                } 
            })}
        </ul>
        </>
    )
}

const WorkListDetails = () => {
    const loc = "In worklist details"; 
    const [workList] = useLoaderData(); 
    
    console.log(loc, workList)
    const workListDetails = workList.details; 
    console.log(loc, 'workListDetails', workListDetails)
    const praesidiumName = workList.praesidiumName; 

    const navigate = useNavigate(); 

    const deleteWorkList = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the workList');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/works/work_list/"+workList.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
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
    
    if (!workList) {
        return (
            <div>
                You are logged out. Please sign in to view this content.
                <br />
                <Link to="../../login">Login</Link>
            </div>
        )
    } 

    return (
        <div>
            <div className="workList-details">
                <p>Praesidium: {praesidiumName}</p>   
                {workListDetails.map(workType => 
                    <RenderDetails 
                        key={workType.name}
                        name={workType.name}
                        metrics={workType.metrics}
                    />
                )}
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deleteWorkList}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default WorkListDetails

// loader function 
export const workListDetailsLoader = async ({ params }) => {
    const loc = 'In worklist details loader';
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log(loc, 'check 1', id);
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const workListResponse = await axios.get(`http://127.0.0.1:8000/api/works/work_list/${id}/`, config); 
            const workListData = workListResponse.data;
            console.log(loc, 'work list data', workListData)
            const workTypesResponse = await axios.get("http://localhost:8000/api/works/work_type_option/", config);
            const workTypesData = workTypesResponse.data; 
            console.log('Work types data:', workTypesData);

            // // Parse the response to obtain the keys 
            // let keys = []; 
            // const printNested = (obj) => {    
            //     if (typeof obj === 'object') {
            //         for (let key in obj) {
            //             if (isNaN(key*0)) {
            //                 // console.log('test 1', key)
            //                 // console.log('test 2', keys, obj[key]);
            //                 keys.push(key); 
            //             }
            //             printNested(obj[key]); 
            //         } 
            //     } 
            // }
            // printNested(workListData);
            // keys.shift(); keys.shift(); keys.shift();

            // Extract the praesidium ID from the workList data
            const praesidiumId = workListData.praesidium;

            // Fetch the praesidium details using the ID
            if (praesidiumId) {
                // console.log('Fetching praesidium details...');
                const praesidiumResponse = await axios.get(`http://127.0.0.1:8000/api/praesidium/praesidium/${praesidiumId}`, config);
                // const praesidiumName = praesidiumResponse.data.name;
                // console.log('Curia response:', praesidiumData);

                // Add the praesidium details to the workList data
                workListData.praesidiumName = praesidiumResponse.data.name;
                return [workListData]; 
            } else {
                console.warn('No praesidium ID found in the workList data');
            }
            // return [workListData, keys]; 
        } else {
            console.log("Sign in to get the workList")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on workLists")
        } else {
            console.error("Error fetching the workList:", err);          
        }
    }
}

                    
                    