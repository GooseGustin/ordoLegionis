import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";

const BASEURL = 'http://localhost:8000/api/';

const PraesidiumForm = (props) => {
    const loc = "In praesidium form";

    const { method } = props; 
    // curiae options should be filtered based on state and country 
    const [obj, curiae, user] = useLoaderData();
    const navigate = useNavigate();
    
    console.log(loc, 'praesidium', obj, method)

    const creating = method==='create';
    // const qualifiedToDelete = !creating;

    const qualifiedToDelete = obj? obj.managers.includes(user.id): false;
    console.log("user is qualified to delete this praesidium", qualifiedToDelete); 


    // define defaults
    const states = [
        'Plateau', 'Sokoto', 'Abia', 'Abeokuta', 'Benin', 'Benue', 
        'Lagos', 'Abuja', 'Ibadan'
    ]
    const countries = [
        'Nigeria', 'Ghana', 'South Africa', 'Italy', 'Dublin'
    ]
    const defaultName = obj? obj.name: 'Our Lady Health of the Sick'
    const defaultState = obj? obj.state: 'Plateau'
    const defaultCountry = obj? obj.country: 'Nigeria'
    const defaultParish = obj? obj.parish: "St. Paul's Catholic Church, Lamingo"
    const defaultCuria = obj? obj.curia: 1 // null
    const defaultAddress = obj? obj.address: 'Inside the church'
    const defaultMeetingTime = obj? obj.meeting_time: 'Every Saturday at 7:30 AM'
    const defaultInaugDate = obj? obj.inaug_date: '2025-01-05' // null 
    const defaultSD = obj? obj.spiritual_director: 'Fr. Michael Moses'
    const defaultSDAppDate = obj? obj.spiritual_director_app_date: '2025-01-05'
    const defaultPresident = obj? obj.president: 'Jules'
    const defaultPresAppDate = obj? obj.pres_app_date: '2025-01-11' // null
    const defaultVicePresident = obj? obj.vice_president: 'Verne'
    const defaultVPAppDate = obj? obj.vp_app_date: '2025-01-05' // null
    const defaultSecretary = obj? obj.secretary: 'Odysius'
    const defaultSecAppDate = obj? obj.sec_app_date: '2025-01-12' // null
    const defaultTreasurer = obj? obj.treasurer: 'Thor'
    const defaultTresAppDate = obj? obj.tres_app_date:'2025-01-05' // null
    const defaultNextDeadline = obj? obj.next_report_deadline: '2025-03-09' // null


    const [praesidiumForm, setPraesidiumForm] = useState({
        name: defaultName, 
        state: defaultState, 
        country: defaultCountry,
        parish: defaultParish,
        curia: defaultCuria, 
        address: defaultAddress, 
        meeting_time: defaultMeetingTime, 
        inaug_date: defaultInaugDate,
        spiritual_director: defaultSD, 
        spiritual_director_app_date: defaultSDAppDate, 
        president: defaultPresident, 
        pres_app_date: defaultPresAppDate, 
        vice_president: defaultVicePresident, 
        vp_app_date: defaultVPAppDate, 
        secretary: defaultSecretary, 
        sec_app_date: defaultSecAppDate,
        treasurer: defaultTreasurer, 
        tres_app_date: defaultTresAppDate, 
        next_report_deadline: defaultNextDeadline, 
        reports: obj? obj.reports: [], 
        work_list: obj? obj.work_list: []
    })

    const handleChange = (e) => {
        console.log("In handle change", e.target.name, e.target.value)
        setPraesidiumForm({
            ...praesidiumForm, 
            [e.target.name]: e.target.value
        })
    }

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Delete the praesidium');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete(BASEURL+"praesidium/praesidium/"+obj.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate(creating? "../": '../../')
            }  else {
                console.log("Sign in to delete the announcement")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this announcement")
                navigate('/account/login');
            } else {
                console.error("Error deleting the announcement:", err);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const loc = "In submit form"; 
        console.log(loc, 'praesidium', praesidiumForm);
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                let praesidiumResponse;
                if (creating) {
                    praesidiumResponse = await axios.post(`${BASEURL}praesidium/praesidium/`, praesidiumForm, config);
                    // Create initial worklist
                    const initialWorkList = {
                        "praesidium": praesidiumResponse.data.id,
                        "details": []
                    }
                    const workListResponse = await axios.post(`${BASEURL}works/work_list/`, initialWorkList, config);
                    console.log("Initialising worklist", workListResponse.data); 
                    navigate(`../${praesidiumResponse.data.id}`);
                } else {
                    praesidiumResponse = await axios.put(`${BASEURL}praesidium/praesidium/${obj.id}/`, praesidiumForm, config);
                }
                
                const praesidiumFeedback = praesidiumResponse.data; 
                console.log('In submit praesidium form, code', praesidiumFeedback, praesidiumFeedback.status_code);
                
            } else {
                console.log("Sign in to get praesidia paradisei")
                // navigate('../')
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to view praesidia")
                // setErrStatus(401); 
            } else {
                console.error("Error fetching curia:", err);
            }
        }
    }

    const pageTitle = creating ? "Create a praesidium" : "Edit your praesidium";
    return (
        <div>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                    
                <NavLink className="nav-link" to='../'>
                    <span className="icon">
                        <i className="bi bi-grid"></i>
                        <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                    </span>
                    {
                    !creating? 
                    <span>Praesidium</span>: 
                    <span>Praesidium list</span>
                    }
                </NavLink>


                {/* help  */}
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
            <h2 className="mt-4">{pageTitle}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row col-10">
                    <label htmlFor="">
                        <span>Name</span>
                        <input 
                            type="text" 
                            name="name" id="" 
                            placeholder="Our Lady..."
                            className="form-control border border-dark"
                            defaultValue={defaultName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
        
            {/* Location */}
            <div className="location border border-dark rounded rounded-3 p-3 my-2">
                
                <p className="fs-4">Location</p>

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                    <div className="col-5 col-md-5 col-lg-6 col-sm-10">
                        <label htmlFor="">
                            <span>State</span>
                            <select name="state" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultState}
                                onChange={handleChange}>
                                {states.map(state => (
                                    <option 
                                        value={state}
                                        key={state}
                                    >{state}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="col-10 col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span>Country</span>
                            <select name="country" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultCountry}
                                onChange={handleChange}>
                                {countries.map(country => (
                                    <option 
                                        value={country}
                                        key={country}
                                    >{country}</option>
                                ))}
                            </select>
                        </label>

                    </div>
                    <div className="row col-10 col-lg-10 col-md-10 col-sm-10">
                        <label htmlFor="curia">
                            <span className="">Parish</span>
                            <input 
                                type="text" 
                                name='parish' id=''
                                className='form-control border border-dark'
                                defaultValue={defaultParish}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="row col-10 col-lg-7 col-md-6 col-sm-10">
                        <label htmlFor="address">
                            <span>Meeting location</span>
                            <input 
                                type="text" 
                                name="address" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultAddress}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col-10 col-lg-5 col-md-6 col-sm-10">
                        <label htmlFor="meeting_time">
                            <span>Meeting time</span>
                            <input 
                                type="text" 
                                name="meeting_time" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultMeetingTime}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="row col-10 col-lg-10 col-md-10 col-sm-10">
                        <label htmlFor="curia">
                            <span className="">Curia</span>
                            <select name="curia" id="" 
                                className="form-control border border-dark"
                                onChange={handleChange}>
                            {curiae[0]
                            ? curiae.map(curia =>
                                obj
                                    ? (
                                        <option
                                            value={curia.id}
                                            key={curia.id}
                                            selected={curia.id == defaultCuria ? true : false}
                                        >{curia.name}</option>
                                    )
                                    : (
                                        <option
                                            value={curia.id}
                                            key={curia.id}
                                        >{curia.name}</option>
                                    )
                                )
                            : <option value="">Sign in to select curia</option>
                            } 
                            </select>
                        </label>
                    </div>
                </div> 
            </div> {/* Location */}
                        
            <div className="dates rounded rounded-3 border border-dark p-3 my-3">
                <p className="fs-4">Dates</p>
                <div className="row row-cols-lg-2 row-cols-md-2">
                    <div className="col col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="">
                            <span className="me-1">Inauguration date</span>
                            <input 
                                type="date" name="inaug_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultInaugDate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-12 col-md-12 col-sm-12 gy-2">
                        <label htmlFor="">
                            <span className="me-1">Report submission deadine</span>
                            <input 
                                type="date" name="next_report_deadline" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultNextDeadline}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                </div>
            </div> {/* Dates */}
                
                
            <div className="officers rounded rounded-3 border border-dark p-3 my-3">
                
            <p className="fs-4">Officers</p>
                <div className="row row-cols-lg-2 row-cols-md-2">
                    <div className="col col-lg-6 col-md-6 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1">Spiritual Director</span>
                            <input 
                                type="text" name="spiritual_director" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultSD}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-10 mt-4">
                        <label htmlFor="">
                            <span className="me-1 mb-3">Appointment date</span>
                            <input 
                                type="date" name="spiritual_director_app_date" id="" 
                                defaultValue={defaultSDAppDate}
                                onChange={handleChange}
                                className="form-control-sm border border-dark"
                            />
                        </label>
                    </div>

                    <div className="col col-lg-6 col-md-6 col-sm-10 ">
                        <label htmlFor="">
                            <span className="me-1">President</span>
                            <input 
                                type="text" name="president" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultPresident}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-10 mt-4">
                    <label htmlFor="">
                            <span className="me-1">Appointment date</span>
                            <input 
                                type="date" name="pres_app_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultPresAppDate}
                                onChange={handleChange}
                            />
                        </label>
                        <hr className="mt-3" />
                    </div>
                    
                    <div className="col col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1">Vice President</span>
                            <input 
                                type="text" name="vice_president" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultVicePresident}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-10 mt-4">
                        <label htmlFor="">
                            <span className="me-1">Appointment date</span>
                            <input 
                                type="date" name="vp_app_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultVPAppDate}
                                onChange={handleChange}
                            />
                        </label>
                        <hr className="mt-3" />
                    </div>
                    <div className="col col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1">Secretary</span>
                            <input 
                                type="text" name="secretary" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultSecretary}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col-10 col-lg-6 col-md-6 col-sm-10 mt-4">
                        <label htmlFor="">
                            <span className="me-1">Appointment date</span>
                            <input 
                                type="date" name="sec_app_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultSecAppDate}
                                onChange={handleChange}
                            />
                        </label>
                        <hr className="mt-3" />
                    </div>
                    <div className="col col-lg-6 col-md-5 col-sm-10">
                        <label htmlFor="">
                            <span className="me-1">Treasurer</span>
                            <input 
                                type="text" name="treasurer" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultTreasurer}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="col-10 col-lg-6 col-md-6 col-sm-10 mt-4">
                        <label htmlFor="">
                            <span className="me-1">Appointment date</span>
                            <input 
                                type="date" name="tres_app_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultTresAppDate}
                                onChange={handleChange}
                            />
                        </label>
                        <hr className="mt-3" />
                    </div>
                    <div className="col-10 col-lg-6 col-md-5- col-sm-10"></div>
                </div>

            </div>

            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-outline-success col-12 rounded rounded-5">Save</button>
                </div>
                <div className="col">
                    <Link to="../" className="btn btn-outline-primary col-12 rounded rounded-5">Cancel</Link>
                </div>
                {
                    (qualifiedToDelete && !creating)
                    ? <div className="col">
                        <Link 
                            to='' 
                            className='btn btn-outline-danger col-12 rounded rounded-5'
                            onClick={handleDelete}
                        >Delete</Link>
                    </div>
                    : <></>
                }
            </div> 

                
            </form>
        </div>

        </div>
    )
}

export default PraesidiumForm

export const praesidiumFormLoader = async ({params}) => {
    let curiaList = []; 
    let obj, user;

    // Get curia id 
    const {pid} = params;
    console.log('In praesidium form loader, pid', pid); 

    // Get curia object 
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            if (pid) {
                const praesidiumResponse = await axios.get(BASEURL + `praesidium/praesidium/${pid}`, config);
                obj = praesidiumResponse.data; 
                console.log('In praesidium form loader, praesidium', obj);
            }
            const curiaResponse = await axios.get(BASEURL + 'curia/curia/', config);
            curiaList = curiaResponse.data; 
            
            const userResponse = await axios.get(BASEURL + 'accounts/user', config); 
            user = userResponse.data;

        } else {
            console.log("Sign in to get praesidia paradisei")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view praesidia")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching curia:", err);
        }
    } finally {
        return [obj, curiaList, user]; 
    }
}
