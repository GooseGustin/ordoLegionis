import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom"

const BASEURL = "http://localhost:8000/api/";

const CuriaForm = (props) => {
    const curiaObj = useLoaderData(); 
    const loc = 'In curia form'; 

    const { method } = props;
    console.log(loc, 'curia', curiaObj); 
    const navigate = useNavigate();

    const defaultName = curiaObj? curiaObj.name: ''
    const defaultInaugDate = curiaObj? curiaObj.inaug_date: null
    // consol
    const defaultState = curiaObj? curiaObj.state: 'Abia'
    const defaultCountry = curiaObj? curiaObj.country: 'Nigeria'
    const defaultParish = curiaObj? curiaObj.parish: ''
    const defaultSD = curiaObj? curiaObj.spiritual_director: ''
    const defaultSDAppDate = curiaObj? curiaObj.spiritual_director_app_date: null

    const [curiaForm, setCuriaForm] = useState({
        name: defaultName, 
        inaug_date: defaultInaugDate,
        state: defaultState, 
        country: defaultCountry, 
        parish: defaultParish, 
        spiritual_director: defaultSD, 
        spiritual_director_app_date: defaultSDAppDate
    }); 

    const handleFormChange = (e) => {
        console.log("In handle change", e.target.name, e.target.value);
        const temp = {
            ...curiaForm,
            [e.target.name]: e.target.value 
        }
        setCuriaForm(temp)
        console.log(temp)
    }

    const states = [
        'Plateau', 'Sokoto', 'Abia', 'Abeokuta', 'Benin', 'Benue', 
        'Lagos', 'Abuja', 'Ibadan'
    ]
    const countries = [
        'Nigeria', 'Ghana', 'South Africa', 'Italy', 'Dublin'
    ]
    const obj = undefined;

    const submitForm = async (e) => {
        e.preventDefault(); 
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                let curiaResponse;
                if (method === 'create') {
                    curiaResponse = await axios.post(`${BASEURL}curia/curia/`, curiaForm, config);
                } else {
                    curiaResponse = await axios.put(`${BASEURL}curia/curia/${curiaObj.id}/`, curiaForm, config);
                }
                const curiaFeedback = curiaResponse.data; 
                console.log('In submit curia form, code', curiaFeedback.status);
                method === 'create'? navigate('../../'): navigate('../');
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

    const pageTitle = method == 'create' ? "Create a curia" : "Edit your curia";

    return (
        <div>
        {/* sidebar */}
        <div className="sidebar">
            <nav className="nav flex-column">
                {
                    method === 'edit'? 
                    (
                    <NavLink className="nav-link" to='../'>
                        <span className="icon">
                            <i className="bi bi-grid"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Curia</span>
                    </NavLink>
                    ): <></>
                }


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
            <h2 className="mt-4">{pageTitle}</h2>
            <form onSubmit={submitForm}>
                <div className="row col-10">
                    <label htmlFor="">
                        <span>Name</span>
                        <input 
                            type="text" 
                            name="name" id="" 
                            placeholder="Our Lady..."
                            className="form-control border border-dark"
                            defaultValue={defaultName}
                            onChange={handleFormChange}
                        />
                    </label>
                </div>
                <div className="row row-cols-lg-2 row-cols-md-2 mt-2">
                    <div className="col col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="">
                            <span className="me-1">Inauguration date</span>
                            <input 
                                type="date" name="inaug_date" id="" 
                                className="form-control-sm border border-dark"
                                defaultValue={defaultInaugDate}
                                onChange={handleFormChange}
                            />
                        </label>
                    </div>

                </div>
                
            
            {/* Location */}
            <div className="location border border-dark rounded rounded-3 p-3 my-2">
                
                <p className="fs-4">Location</p>

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2">
                    <div className="col-5 col-md-5 col-lg-6 col-sm-10">
                        <label htmlFor="">
                            <span>State</span>
                            <select name="state" id="" 
                                // defaultValue={defaultState}
                                onChange={handleFormChange}
                                className="form-control border border-dark">
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
                                onChange={handleFormChange} 
                                // defaultValue={defaultCountry}
                                className="form-control border border-dark">
                                {countries.map(country => (
                                    <option 
                                        value="country"
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
                                onChange={handleFormChange}
                            />
                        </label>
                    </div>
                    
                </div> 
            </div> {/* Location */}
                        
                
            <div className="officers rounded rounded-3 border border-dark p-3 my-3">
                
            <p className="fs-4">Officers</p>
                <div className="row row-cols-lg-2 row-cols-md-2">
                    <div className="col col-lg-6 col-md-6 col-12">
                        <label htmlFor="">
                            <span className="me-1">Spiritual Director</span>
                            <input 
                                type="text" name="spiritual_director" id="" 
                                className="form-control border border-dark"
                                defaultValue={defaultSD}
                                onChange={handleFormChange}
                            />
                        </label>
                    </div>
                    <div className="col mt-lg-4 mt-md-0">
                    <label htmlFor="">
                            <span className="me-1 mb-3">Appointment date</span>
                            <input 
                                type="date" name="spiritual_director_app_date" id="" 
                                defaultValue={defaultSDAppDate}
                                onChange={handleFormChange}
                                className="form-control-sm border border-dark"
                            />
                        </label>
                    </div>
                    
                </div>

            </div>

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

export default CuriaForm


export const curiaFormLoader = async ({params}) => {
    let curiaObj; 

    // Get curia id 
    const {cid} = params;
    console.log('In curia form loader, cid', cid); 

    // Get curia object 
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const curiaResponse = await axios.get(BASEURL + `curia/curia/${cid}`, config);
            curiaObj = curiaResponse.data; 
            console.log('In curia form loader, curia', curiaObj);

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
        return curiaObj; 
    }
}