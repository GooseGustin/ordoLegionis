import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const BASEURL = "http://localhost:8000/api/";

export default function Login() {
    const [formData, setFormData] = useState({
        email: 'testuser1@gmail.com', // goosegustin@
        password: '#fightC1ub#',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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

        try {
            const response = await axios.post(`${BASEURL}accounts/login/`, formData);
            // console.log("Success!", response.data) 
            setSuccessMessage("Login Successful!");
            localStorage.setItem('accessToken', response.data.tokens.access)
            localStorage.setItem('refreshToken', response.data.tokens.refresh)
            setTimeout(function() { setSuccessMessage(""); }, 2000);
            // navigate("/");
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
    }

    return (
        <div className="container p-5 mt-5 row">
            <div className="col-3"></div>
            <div className="col container mt-5 text-center border border-info rounded shadow p-5">
            {error && <p className="mt-5 text-danger">{error}</p>}
            {successMessage && <p className="mt-5 text-success">{successMessage}</p>}

            <h2 className="mb-5">Login</h2>
            <form className=" p-3">
                <div className="row ">
                    <div className="col">
                        <label>Email:
                            <input
                                type="email" name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control border border-dark"
                            />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>
                            Password:
                            <input
                                type="password" name="password"
                                value={formData.password}
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
                    >Login</button>
                    </div>
                </div>
            </form>
            </div>
            <div className="col-3"></div>
        </div>
    )
}
