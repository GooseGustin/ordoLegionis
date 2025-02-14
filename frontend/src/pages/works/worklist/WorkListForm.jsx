import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLoaderData, useParams } from 'react-router-dom'

const BASEURL = "http://127.0.0.1:8000/api/";

function isAnEmptyObject(value) {
    return typeof value === 'object' && 
           value !== null && 
           !Array.isArray(value) && 
           Object.keys(value).length === 0;
}

function isAnEmptyArray(value) {
    return Array.isArray(value) && value.length === 0;
}

function parseObjectKeys(someObj) {
    let keys = []; 
    if (isAnEmptyObject(someObj)) {
        for (let key in someObj) {
            keys.push(key); 
        }
    }
    return keys; 
}

function findall(arr, x) {
    /* return all the indices of x in array a */
    var results = [], 
    len = arr.length,
    pos = 0; 
    while(pos < len) { 
        pos = arr.indexOf(x, pos); 
        if (pos === -1) break; 
        results.push(pos); 
        pos = pos + 1; 
    }
    return results;
}

function getDefaultDetails(workTypesArray) {
    const loc = 'In get default details'; 
    let defaultDetails = [];
    for (let key in workTypesArray) {
        const obj = workTypesArray[key];
        let detail = {
            name: obj.name 
        }; 
        // console.log(loc, 'check 1', detail)
        let objMetrics = {}; 
        for (let metricKey in obj.metrics) {
            objMetrics[obj.metrics[metricKey]] = false; 
            // console.log(loc, 'check 2', objMetrics); 
        }
        detail.metrics = objMetrics; 
        defaultDetails.push(detail); 
    }
    // console.log(loc, 'check 3', defaultDetails); 
    return defaultDetails;
}



const RenderDetailsForm = ({ workTypeName, workTypeMetrics, handleFunction, workListDetails }) => {
    /* Work types are what are displayed 
        Work list is which are selected */
    const loc = 'In work list form render details'
    console.log(loc, 'worklistdetails', workListDetails);
    // console.log(loc, 'worktype metrics', workTypeMetrics)
    // Remove any duplicate metrics 
    for (let item in workListDetails) {
        if (findall(workListDetails, item).length > 1) {
            // remove item 
            // console.log(item, 'from workListDetails is repeated. Must remove')   
        }
    }
    // Render any metrics in the workList that are not in the workType

    // Get the metrics in the worklist for this specific worktype 
    let specificWorkListMetricsObj = workListDetails.filter(function (item) {
        return item.name == workTypeName;
    });
    specificWorkListMetricsObj = !isAnEmptyArray(specificWorkListMetricsObj)
    ? specificWorkListMetricsObj[0]['metrics']: {};
    // console.log(loc, 'selected metrics for', workTypeName, '::', specificWorkListMetricsObj)
    // check for all metrics, both from the worktypemetrics and worklistdetails
    let metricsFromListDetailsArray = parseObjectKeys(specificWorkListMetricsObj); 
    metricsFromListDetailsArray = metricsFromListDetailsArray.filter(item => specificWorkListMetricsObj[item]);
    // console.log(loc, 'check 1', metricsFromListDetailsArray); 
    const extraMetrics = metricsFromListDetailsArray.filter(item => !workTypeMetrics.includes(item)); 
    // console.log(loc, 'check 2', extraMetrics);
    const allMetrics = workTypeMetrics.concat(extraMetrics)
    // console.log(loc, 'all metrics', allMetrics); 



    return (
        <>
        <h2>{workTypeName}</h2>
        <ul>
            <fieldset>
            {allMetrics.map(metric => {
                // find out whether checkbox is checked or not; check worklist details
                return (
                    <label htmlFor="" key={metric}>
                        <input 
                            type="checkbox" 
                            name={workTypeName + ">>>" + metric}
                            defaultChecked={specificWorkListMetricsObj? specificWorkListMetricsObj[metric]: false}
                            value={metric}
                            onChange={handleFunction}
                        />
                        {metric}<br />
                    </label>
                )
            })}
            </fieldset>
        </ul>
        </>
    )
}


const WorkListForm = (props) => {
    // CREATE A NEW STATE VARIABLE FOR UPDATING THE WORKTYPESARRAY 
    let [workTypesArray, obj, praesidia] = useLoaderData(); 
    const loc = "In worklist form"; 
    const navigate = useNavigate();
    const { method } = props;
    console.log(loc, 'Object and method', obj, method)
    console.log("Initial work type array", workTypesArray); 
    const defaultDetails = obj? obj.details : getDefaultDetails(workTypesArray); 

    // console.log(loc, 'check 1', defaultDetails);
    const [details, setDetails] = useState(defaultDetails);
    const [formData, setFormData] = useState({
        praesidium: obj ? obj.praesidium : 1,
        details: defaultDetails
    })
    let detailsForForm = defaultDetails; 

    const formatWorkTypeArray = (workListObj, workTypesArray) => {
        const loc = 'formatWorkTypeArray';
        if (workListObj) {
            // What is going on here??
            const workDetails = workTypesArray[0].details; 
            const workKeys = workTypesArray[1];
            const allWorkTypes = workTypesArray[2]; 
            console.log(loc, 'Work details', workDetails)
            // console.log(loc, 'Work keys', workKeys); 
            console.log(loc, 'All work types', allWorkTypes); 
            let workArray = [];
            for (let i=0; i<workKeys.length; i++) {
                workArray.push({
                    id: i, 
                    name: workKeys[i], 
                    metrics: workDetails[workKeys[i]]
                })
            }
            console.log("Work types array is now", workArray) 
            return [workArray, allWorkTypes]; 
        } 
        return [workTypesArray, null];
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckboxChange = (e) => {
        const loc = 'In handleCheckboxChange';
        // console.log(e.target.name, e.target.checked);
        let [workName, workMetric] = e.target.name.split('>>>'); 
        let detailsCopy = details; 
        for (let key in detailsCopy) {
            if (detailsCopy[key].name === workName) { // detail of interest
                detailsCopy[key].metrics[workMetric] = e.target.checked; 
            }
        }
        console.log('check 6', detailsCopy); 
        setDetails(detailsCopy); 
        detailsForForm = detailsCopy; 

    }

    const submitWorkList = async (e) => {
        e.preventDefault();
        // setFormData({
        //     ...formData,
        //     details: details
        // });
        const formDataCopy = {
            ...formData, 
            details: detailsForForm
        }
        setFormData(formDataCopy)
        try {
            console.log("In submit work", details)
            console.log('Trying to send', formData);
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };

                if (method === 'create') {
                    const response = await axios.post(BASEURL + "works/work_list/", formData, config);
                    console.log("Success!", response)
                } else if (method === 'edit') {
                    const response = await axios.put(BASEURL + `works/work_list/${obj.id}/`, formData, config);
                    console.log("Success!", response)
                }
                console.log("WorkList Operation Successful!");
                obj ? navigate(`/worklists/${obj.id}`) : navigate('/worklists')

            } else {
                console.log("Sign in to operate on worklists")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on worklists")
            } else if (err.status === 400) {
                console.log("Probably tried to create worklist for praesidium with one already", err)
                obj ? navigate(`/worklists/${obj.id}`) : navigate('/worklists')
            } else {
                console.log("Error during operation", err)
            }
        }
    }

    let allWorkTypes; 
    console.log('WorkTypes', workTypesArray, allWorkTypes)
    const pageTitle = method == 'create' ? "Create a worklist" : "Edit your worklist";
    const btnTitle = method == 'create' ? "Create" : "Edit";

    if (!workTypesArray) {
        return (
            <div>
                <p>You are logged out. Please sign in again to create workLists.</p>
                <p><Link to='../../login'>Login</Link></p>
            </div>
        )
    }

    return (
        <div className='worklist-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitWorkList}>
                <label htmlFor="praesidium">
                    Praesidium: 
                    <select name="praesidium" id="praesidium"
                        onChange={handleChange}
                        defaultValue={obj? obj.praesidium: 1}>
                        {praesidia.map(praesidium =>
                            (
                                <option
                                    value={praesidium.id}
                                    key={praesidium.id}
                                >{praesidium.name}</option>
                            ))}
                    </select>
                </label><br /><br />
                {
                    workTypesArray.map(workTypeObj => (
                        <RenderDetailsForm 
                            key={workTypeObj.id}
                            workTypeName={workTypeObj.name}
                            workTypeMetrics={workTypeObj.metrics}
                            handleFunction={handleCheckboxChange}
                            workListDetails={obj? obj.details: []}
                        //     allWorkTypes={allWorkTypes}
                        />
                        // <></>
                    ))
                }
                <hr />
                <button type="submit">{btnTitle}</button>
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}


export default WorkListForm

// loader function 
export const workListFormLoader = async ({ params }) => {
    // return the worktypes and the current worklist
    const loc = "In work list form loader";
    const { id } = params;  

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log(loc, 'Get the workList');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const workTypesResponse = await axios.get(BASEURL + "works/work_type_option/", config); 
            const workTypesData = workTypesResponse.data;
            // console.log(loc, 'Work types response:', workTypesData);
            const praesidiaResponse = await axios.get(BASEURL + "praesidium/praesidium/", config);
            const praesidia = praesidiaResponse.data;

            // get worklist object
            let workListObj; 
            if (id) {
                console.log(loc, 'getting worklist object', id);
                const workListResponse = await axios.get(BASEURL + `works/work_list/${id}`, config); 
                workListObj = workListResponse.data; 
            }
            return [workTypesData, workListObj, praesidia]; // [workListData, keys]; 
        } else {
            console.log("Sign in to get the work types")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on work types")
        } else {
            console.error("Error fetching the work types:", err);          
        }
    }
}

