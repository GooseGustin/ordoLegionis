import axios from "axios";
import { useState } from "react"
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom"


const BASEURL = "http://localhost:8000/api/";

const WorkCreate = () => {

    const [_, workListObj, praesidium] = useLoaderData();

    console.log("In work create", workListObj); 
    const navigate = useNavigate(); 

    const [workForm, setWorkForm] = useState({
        metrics: {},
        name: '', 
        active: false, 
        tracking: true
    })

    const [metrics, setMetrics] = useState([]); 

    const handleName = (e) => {
        setWorkForm({
            ...workForm,
            name: e.target.value
        }); 
    }

    const handleIsActive = (e) => {
        setWorkForm({
            ...workForm,
            active: e.target.checked
        }); 
    }

    const handleMetrics = (e) => {
        let metricsList = e.target.value.split(',');
        console.log('metricsList after splitting', metricsList); 
        metricsList = metricsList.map(item => item.trim());
        console.log('metricsList after trimming', metricsList)
        setMetrics(metricsList); 
        let metricsObj = {}; 
        for (let i in metricsList) {
            const met = metricsList[i]; 
            if (met !== '') {metricsObj[met] = true;}
        }
        setWorkForm({
            ...workForm, 
            metrics: metricsObj
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault(); 


        console.log(workForm); 
        workListObj['details'].push(workForm);
        const workListObjUpdate = {
            ...workListObj, 
        }

        console.log("In handle submit, worklistupdate", workListObjUpdate);
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };

                // if (method === 'create') {
                const response = await axios.put(BASEURL + `works/work_list/${workListObj.id}/`, workListObj, config);
                console.log("Success!", response)
                console.log("WorkList Operation Successful!");
                // navigate(`../worklist`) : navigate('worklist')
                navigate('../')
                

            } else {
                console.log("Sign in to operate on worklists")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on worklists")
            } else if (err.status === 400) {
                console.log("Probably tried to create worklist for praesidium with one already", err)
                workListObj ? navigate(`/worklists/${workListObj.id}`) : navigate('/worklists')
            } else {
                console.log("Error during operation", err)
            }
        }
    }
    
    return (
        <div className='create-work'>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                <NavLink className="nav-link" to='../'>
                    <span className="icon">
                        <i className="bi bi-grid"></i>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Praesidium</span>
                </NavLink>
                <NavLink className="nav-link" to='../meeting/create'>
                    <span className="icon">
                        <i className="bi bi-grid"></i>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">New meeting</span>
                </NavLink>
                <NavLink className="nav-link" to='../worklist'>
                    <span className="icon">
                        <i className="bi bi-grid"></i>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    <span className="description">Worklist</span>
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
        
        {/* main content */}
        <div className="main-content">
            
        <h2>Create a new work</h2>
        <form onSubmit={handleSubmitForm}>
            <div className="row col-10">
                <label htmlFor="">
                    <span>Name</span>
                    <input 
                        type="text" 
                        name="name" id="" 
                        className="form-control border border-dark"
                        onChange={handleName}
                    />
                </label>
            </div>

            <div className="row col-10 mt-3 ">
                    <label htmlFor="active">
                        <span className="me-4">Is an active work</span>
                        <input type="checkbox" name="active" id="" 
                            className="form-check-input"
                            onChange={handleIsActive}
                        />
                    </label>
                </div>
                

            <div className="border border-dark rounded rounded-3 p-3 my-3">
            <p className="fs-4">Metrics (optional)</p>
            <p>Enter items to keep count of during the course of the work. Separate with commas</p>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                <div className="col-10 row">
                    <label htmlFor="">
                        <span>No. of </span>
                        <input 
                            type="text" 
                            name="metrics" id="" 
                            placeholder="Eg, Active Catholics, Separated brethren, Patients..."
                            className="form-control border border-dark"
                            onChange={handleMetrics}
                        />
                    </label>
                </div>

                {/* <div className="col-10 col-lg-6 col-md-5 col-sm-10">
                    <label htmlFor="">
                        <span>No. of </span>
                        <input 
                            type="text" 
                            name="metric2" id="" 
                            placeholder="Eg, Patients"
                            className="form-control border border-dark"
                        />
                    </label>
                </div> */}

                {/* <div className="col">
                    <Link onClick={addMetricForm}>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </Link>
                </div> */}

            </div>
            </div>
            <hr />
            
            <div className="row">
                <div className="col-6">
                    <button type="submit" className="btn btn-outline-success col-12 rounded rounded-5">Save</button>
                </div>
                <div className="col">
                    <Link to="../" className="btn btn-outline-primary col-12 rounded rounded-5">Cancel</Link>
                </div>
            </div>
        </form>
        </div>

        </div>
    )
}

export default WorkCreate

