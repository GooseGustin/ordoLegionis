import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const RenderDetails = ({ name, detailsList }) => {
    console.log('In render details', detailsList)
    return (
        <>
        <h4>{name}</h4>
        <ul>
            {detailsList.map(item => (
                <li key={name+item}>{item}</li>
        ))}
        </ul>
        </>
    )
}

const WorkListDetails = () => {
    console.log("In worklist details")
    const [workList, keys, workTypes] = useLoaderData(); 
    
    console.log("worklist details", workList.details, 'keys', keys)
    const detailsObject = workList.details; 
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
                const res = await axios.delete("http://localhost:8000/api/workLists/workLists/"+workList.id+"/", config); 
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
                {keys.map(keyName => (
                    <RenderDetails 
                        name={keyName} 
                        detailsList={detailsObject[keyName]} 
                        // keyName={keyName} 
                    />)
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
    console.log('In worklist details loader');
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the workList');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const workListResponse = await axios.get("http://127.0.0.1:8000/api/works/work_list/" + id, config); 
            const workListData = workListResponse.data;
            const workTypesResponse = await axios.get("http://localhost:8000/api/works/work_type_options", config);
            const workTypesData = workTypesResponse.data; 
            console.log('Work types data:', workTypesData);

            // Parse the response to obtain the keys 
            let keys = []; 
            const printNested = (obj) => {    
                if (typeof obj === 'object') {
                    for (let key in obj) {
                        if (isNaN(key*0)) {
                            // console.log('test 1', key)
                            // console.log('test 2', keys, obj[key]);
                            keys.push(key); 
                        }
                        printNested(obj[key]); 
                    } 
                } 
            }
            printNested(workListData);
            keys.shift(); keys.shift(); keys.shift();

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
                return [workListData, keys, workTypesData]; 
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

                    
                    