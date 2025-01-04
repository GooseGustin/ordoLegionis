import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios' 

export default function Register() {
    const [formData, setFormData] = useState({
        username:'', 
        email:'', 
        password1:'', 
        password2:'' 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
        // console.log(formData);
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
        } catch (err) {
            console.log("Error during registration", err.response.data)
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
    <div>
        {error && <p style={{color:'red'}}>{error}</p>}
        {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
        
        <h2>Register</h2>
        <hr />
        <form>
            <label>Username: <input type="text" name="username" value={formData.username} 
                onChange={handleChange} /></label><br />
            
            <br />
            <label>Email: <input type="email" name="email" value={formData.email}
                 onChange={handleChange} /></label><br />
            
            <br />
            <label>Enter password: <input type="password" name="password1" value={formData.password1}
                 onChange={handleChange} /></label><br />
            <br />
            <label>Confirm password: <input type="password" name="password2" value={formData.password2} 
                 onChange={handleChange} /></label><br />
            <hr />
            <button type="submit" onClick={handleSubmit} disabled={isLoading}>Register</button>
        </form>
    </div>
  )
}
