import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios' 

export default function Register() {
    const [formData, setFormData] = useState({
        username:'', 
        email:'', 
        password1:'', 
        password2:'' 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
        console.log(formData);
    }
    

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true); 

        try {
            const response = await axios.post("http://localhost:8000/api/accounts/register/", formData);
            console.log("Success!", response.data) 
            setSuccessMessage("Registration Successful!"); 
            setTimeout(function() { setSuccessMessage(""); }, 2000);
            navigate("../../");
        } catch (err) {
            console.log("Error during registration", err.response.data)
            
            // if (err.status === 400) {
            //     console.log("The session is expired. Please sign in again to operate on questions")
            // } else {
            //     console.log("Error during registration", err.response.data) 
            // }
            if (err.response && err.response.data) {
                Object.keys(err.response.data).forEach(field => {
                    const errorMessages = err.response.data[field]; 
                    if (errorMessages && errorMessages.length > 0) {
                        setError(errorMessages[0])
                    }
                })
            }
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="container p-5 mt-5 row justify-content-center align-items-center">
        <div className="col-3"></div>
        <div className="col container mt-5 text-center border border-info rounded shadow p-5">
        {error && <p style={{color:'red'}}>{error}</p>}
        {successMessage && <p style={{color:'green'}}>{successMessage}</p>}

        <h2 className="mb-5">Register</h2>
        <form>
            <div className="row">
                <div className="col-12">
                    <label>Username
                        <input 
                            type="text" name="username" 
                            className="form-control border border-dark"
                            value={formData.username} 
                            onChange={handleChange} />
                    </label>
                </div>
                <div className="col-12">
                    <label>Email
                        <input 
                            type="text" name="email" id=""
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control border border-dark"
                        />
                    </label>
                </div>
                <div className="col-12">
                    <label>Enter password
                        <input 
                            type="password" name="password1" 
                            value={formData.password1}
                            onChange={handleChange} 
                            className="form-control border border-dark"
                        />
                    </label>
                </div>
                <div className="col-12">
                    <label>Confirm password
                        <input 
                            type="password" name="password2" 
                            value={formData.password2} 
                            onChange={handleChange} 
                            className="form-control border border-dark"
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <button 
                    type="submit" 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="btn btn-outline-success"
                >Register</button>
                </div>
            </div>
        </form>

        </div>
        {/* <div className="col-3 col-lg-12"></div> */}
        
        <hr />
    </div>
  )
}
