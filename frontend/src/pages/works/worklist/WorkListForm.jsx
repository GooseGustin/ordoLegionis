import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLoaderData, useParams } from 'react-router-dom'

const RenderDetailsForm = ({ name, metrics, handleFunction, allWorkTypes }) => {
    const loc = 'In render details'
    // REMOVE ANY DUPLICATE METRICS 
    
    /* Extract metrics from all work types */
    const currentWorkType = allWorkTypes.filter(function (typeObj) {
        const current = typeObj.name===name? true: false; 
        return current; 
    })
    // console.log(loc, name, metrics)
    console.log(loc, currentWorkType)
    return (
        <>
        <h2>{name}</h2>
        <ul>
            {currentWorkType[0]['metrics'].map(item => (
                <li key={item + name}> 
                    <label htmlFor={item}>
                    <input 
                        type="checkbox" 
                        name={name + '>>>' + item} 
                        id="" 
                        checked={metrics.includes(item)}
                        value={item}
                        onChange={handleFunction} 
                    />{item}
                    </label>
                </li>
        ))}
        </ul>
        </>
    )
}

// CREATE NEW LOADER FUNCTION FOR EDIT?!!

const WorkListForm = (props) => {
    // CREATE A NEW STATE VARIABLE FOR UPDATING THE WORKTYPESARRAY 
    // const { id } = useParams();
    let workTypesArray = useLoaderData(); 
    // const [workTypesArray, setWorkTypesArray] = useState(useLoaderData()); 
    const navigate = useNavigate();
    const [praesidia, setPraesidia] = useState([]);
    const { obj, method } = props;
    // console.log(obj, method)
    // console.log("Object detected", obj)
    console.log("Initial work type array", workTypesArray); 
    const defaultDetails = obj? obj.details : {}; 
    const [details, setDetails] = useState(defaultDetails);

    useEffect(() => {
        const getPraesidia = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/praesidium/praesidium", config);
                    setPraesidia(response.data)
                } else {
                    console.log("Sign in to get praesidia paradisei")
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again to view praesidia")
                    // setErrStatus(401); 
                } else {
                    console.error("Error fetching praesidia:", err);
                }
            }
        }
        getPraesidia();
    }, [])

    const [formData, setFormData] = useState({
        praesidium: obj ? obj.praesidium : 1,
        details: defaultDetails
    })

    const formatWorkTypeArray = (obj, workTypesArray) => {
        const loc = 'formatWorkTypeArray';
        if (obj) {
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
            // Extract 
            // [
            //     {
            //         "id": 1,
            //         "praesidium": 2,
            //         "details": {
            //             "Catechism instruction": [
            //                 "No. of children"
            //             ],
            //             "Home visitation": [
            //                 "No of Catholics",
            //                 "No. of separated brethren",
            //                 "No. of muslims",
            //                 "No. of catechumen",
            //                 "No. of unknowns",
            //                 "No. of atheists",
            //                 "No. of homes"
            //             ],
            //             "Care for children at mass": [
            //                 "No. of children"
            //             ],
            //             "Crowd contact": [
            //                 "No of Catholics",
            //                 "No. of separated brethren",
            //                 "No. of muslims",
            //                 "No. of catechumen",
            //                 "No. of unknowns",
            //                 "No. of atheists"
            //             ]
            //         },
            //         "praesidiumName": "Divine Grace"
            //     },
            //     [ // keys
            //         "Catechism instruction",
            //         "Home visitation",
            //         "Care for children at mass",
            //         "Crowd contact"
            //     ]
            // ]
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
        console.log(loc, workName, workMetric)
        let detailsCopy = details; // say empty object 
        const workExists = details[workName] || false; 
        console.log(loc, 'WorkExists', workExists)

        let metricExists = false; 
        if (workExists) {
            metricExists = detailsCopy[workName].includes(workMetric); 
        }
        // - if e is checked 
        //     - if not work exists 
        //         add to details, push the metric
        //     - else if work exists 
        //         - if metric exists
        //             do nothing 
        //         - else
        //             push the metric
        // - else if e is unchecked 
        //     - if work exists 
        //         - if metric exists
        //             remove from details 
        //         - else 
        //             do nothing 
        //     - else 
        //         do nothing 

        if (e.target.checked) {
            if (!metricExists) {
                // detailsCopy[workName] = []; 
                // 
                if (workExists) {
                    detailsCopy[workName].push(workMetric); 
                } else {
                    detailsCopy[workName] = [workMetric]; 
                }
                setDetails({...detailsCopy}) 
                console.log(metricExists, 'added to', details) 
            } else {
                // do nothing 
                console.log(workName, "Work already exists. Cannot add", details)
            }
        } else { // e is unchecked
            if (metricExists) {
                detailsCopy[workName].splice(detailsCopy[workName].indexOf(workMetric), 1);
                setDetails({
                    ...detailsCopy
                });
                console.log(metricExists, "Removed from details", details)
            } else {
                // do nothing 
                console.log(workName, "Work already not in details. Cannot remove", details)
            }
        }
    }

    const submitWorkList = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            details: details
        });
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
                    const response = await axios.post("http://localhost:8000/api/works/work_list/", formData, config);
                    console.log("Success!", response)
                } else if (method === 'edit') {
                    const response = await axios.put("http://localhost:8000/api/works/work_list/" + obj.id + "/", formData, config);
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
    // let workTypesArr;
    [workTypesArray, allWorkTypes] = formatWorkTypeArray(obj, workTypesArray);  
    // [workTypesArr, allWorkTypes] = formatWorkTypeArray(obj, workTypesArray); 
    // setWorkTypesArray(workTypesArr)
    console.log('WorkTypes', workTypesArray)
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
                        onChange={handleChange}>
                        {praesidia.map(praesidium =>
                            obj
                                ? (
                                    <option
                                        value={praesidium.id}
                                        key={praesidium.id}
                                        selected={praesidium.id == obj.praesidium ? true : false}
                                    >{praesidium.name}</option>
                                )
                                : (
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
                            name={workTypeObj.name}
                            metrics={workTypeObj.metrics}
                            handleFunction={handleCheckboxChange}
                            allWorkTypes={allWorkTypes}
                        />
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
export const workTypesLoader = async () => { //{ params }) => {
    // const { id } = params;     
    // Writing a new loader function??
    // Find out where the params comes from 

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the workList');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const workTypesResponse = await axios.get("http://127.0.0.1:8000/api/works/work_type_options/", config); 
            const workTypesData = workTypesResponse.data;
            console.log('Work types response:', workTypesData);

            /* workTypesData = [
                {
                    "id": 1,
                    "name": "Catechism Instruction",
                    "metrics": [
                        "No. of children"
                    ]
                },
                {
                    "id": 2,
                    "name": "Home Visitation",
                    "metrics": [
                        "No of Catholics",
                        "No. of separated brethren",
                        "No. of muslims",
                        "No. of catechumen",
                        "No. of unknowns",
                        "No. of atheists",
                        "No. of homes"
                    ]
                }
            ] */

            return workTypesData; // [workListData, keys]; 
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

