import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios' 

export default function Login() {
    const [formData, setFormData] = useState({
        email:'', 
        password:'', 
    });

    const [btnTitle, setBtnTitle] = useState('Login')

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
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true); 
        setBtnTitle('Logging in'); 

        try {
            const response = await axios.post("http://localhost:8000/api/accounts/login/", formData);
            // console.log("Success!", response.data) 
            setSuccessMessage("Login Successful!"); 
            localStorage.setItem('accessToken', response.data.tokens.access)
            localStorage.setItem('refreshToken', response.data.tokens.refresh)
            navigate("/"); 
        } catch (err) {
            console.log("Error during login", err.response?.data)
            if (err.response && err.response.data) {
                Object.keys(err.response.data).forEach(field => {
                    const errorMessages = err.response.data[field]; 
                    if (errorMessages && errorMessages.length > 0) {
                        setError(errorMessages[0]);
                    }
                })
            }
        } finally {
            setIsLoading(false);
        }
        setBtnTitle('Login')
    }

  return (
    <div>
        {error && <p style={{color:'red'}}>{error}</p>}
        {successMessage && <p style={{color:'green'}}>{successMessage}</p>}

        <h2>Login</h2>
        <hr />
        <form>
            <label>Email: <input type="email" name="email" value={formData.email}
                 onChange={handleChange} /></label><br />
            
            <br />
            <label>Password: <input type="password" name="password" value={formData.password}
                 onChange={handleChange} /></label>
            <hr />
            <button type="submit" onClick={handleSubmit} disabled={isLoading}>{btnTitle}</button>
        </form>
    </div>
  )
}
