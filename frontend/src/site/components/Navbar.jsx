import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Ordo Legionis - Mark.svg"

const BASEURL = 'http://localhost:8000/api/';

const Navbar = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(async () => {
    //     // Attempt a request to the backend. A failure with status code of 401 would indicate a session expiry
    //     try {   
    //         const token = localStorage.getItem('accessToken');
    //         if (token) {
    //             const config = {
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`
    //                 }
    //             };

    //             const userResponse = await axios.get(BASEURL + 'accounts/user/', config); 
    //             setIsLoggedIn(true); 
    //             console.log("user is logged in"); 
    //         }
    //     } catch (err) {
    //         if (err.status_code == 401) {
    //             setIsLoggedIn(false);
    //             console.log("User is logged out"); 
    //         } else {
    //             console.log(err);
    //         }
    //     }

    // }, [])

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
      
            if (accessToken && refreshToken) {
                const config = {
                    headers: {
                      "Authorization":`Bearer ${accessToken}`
                    }
                  };
                await axios.post(
                    BASEURL + 'accounts/logout/', {"refresh": refreshToken}, config
                    )
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                setIsLoggedIn(false); 
                // setUsername('');
                console.log('Logging out');
                navigate('/account/login');
            }
        } catch(err) {
            console.log("Failed to log out", err.response?.data || err.message) 
        }
    }

    return (
        <div className="">
            {/* Navbar */}
            <nav class="navbar navbar-expand-lg bg-light fixed-top navbar-dark bg-dark"> 
                <div class="container"> 
                    {/* Logo */} 
                    <Link class="navbar-brand text-white fs-4 text-decoration-none"><img src={Logo} alt="" className='nav-logo'/> OrdoLegionis</Link> 

                    {/* Toggle button  */} 
                    <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"> 
                        <span class="navbar-toggler-icon"></span> 
                    </button>

                    {/* Sidebar */} 
                    <div class="sider offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"> 
                        {/* Sidebar header */}
                        <div class="offcanvas-header text-white border-bottom ">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                            <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        {/* Sidebar body */}
                        <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                            <ul class="navbar-nav justify-content-center align-items-center flex-grow-1 fs-5 flex-grow-1 pe-3">
                                <li class="nav-item mx-2">
                                    <NavLink class="nav-link text-white text-decoration-none" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li class="nav-item mx-2">
                                    <NavLink class="nav-link text-white text-decoration-none" to="/praesidium">Praesidia</NavLink>
                                </li>
                                <li class="nav-item mx-2">
                                    <NavLink class="nav-link text-white text-decoration-none" to="/resources">Resources</NavLink>
                                </li>
                                <li class="nav-item mx-2">
                                    <NavLink class="nav-link text-white text-decoration-none" to="/store">Store</NavLink>
                                </li>
                                <li class="nav-item mx-2">
                                    <NavLink class="nav-link text-white text-decoration-none" to="/pricing">Pricing</NavLink>
                                </li>
                            </ul>

                            {/* <form class="d-flex mt-3" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form> */}

                            {/* Login / Sign up */}
                            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
                                <NavLink to='account/login' className='text-white text-decoration-none'>Login</NavLink>
                                <NavLink 
                                    to='account/register' 
                                    className='text-white text-decoration-none px-3 py-1 ms-2 rounded-4'
                                    style={{backgroundColor: '#f94ca4'}}
                                >Sign up</NavLink>
                                <NavLink 
                                    // to='account/logout' 
                                    onClick={handleLogout}
                                    className='text-white text-decoration-none'
                                >Logout</NavLink>
                            </div>
                        </div>
                    </div> 
                </div> 
            </nav>
        </div>
    )
}

export default Navbar



        // <div className=''>
        //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark border border-dark mb-2">
        //         <div className="container-fluid">
        //             <div className="navbar-brand">OrdoLegionis</div>
        //             <ul className="navbar-nav gx-1">
        //                 <li className="nav-item"><NavLink className="nav-link" to='#'>Account</NavLink></li>
        //                 <li className="nav-item"><NavLink className="nav-link" to='#'>Login</NavLink></li>
        //                 <li className="nav-item"><NavLink className="nav-link" to='#'>Profile</NavLink></li>
        //             </ul>
        //         </div>
        //     </nav>

        //     <ul className="nav nav-tabs justify-content-center">
        //         <li className="nav-item">
        //             <NavLink className="nav-link" aria-current="page" to="/">
        //                 Home
        //             </NavLink>
        //         </li>
        //         <li className="nav-item">
        //             <NavLink className="nav-link" to="/praesidium">
        //                 Praesidium
        //             </NavLink>
        //         </li>
        //         <li className="nav-item">
        //             <NavLink className="nav-link" to="/resources">
        //                 Resources
        //             </NavLink>
        //         </li>
        //         <li className="nav-item">
        //             <NavLink className="nav-link" to="/store">
        //                 Store
        //             </NavLink>
        //         </li>
        //         <li className="nav-item">
        //             <NavLink className="nav-link" to="/pricing">
        //                 Pricing
        //             </NavLink>
        //         </li>
        //     </ul>
        // </div>