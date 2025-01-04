import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

export default function Home() {
    const [username, setUsername] = useState(""); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    // console.log('Get the user');
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 
                    const response = await axios.get("http://127.0.0.1:8000/api/accounts/user/", config); 
                    setIsLoggedIn(true);
                    setUsername(response.data.username);
                    // console.log(`${response.data.username} is logged in`);
                } else {
                    setIsLoggedIn(false); 
                    setUsername(''); 
                }
            } catch (err) {
                if (err.status === 401) {
                    console.log("The session is expired. Please sign in again")
                } else {
                    console.error("Error fetching user login status:", err);                    
                }
                setIsLoggedIn(false); 
                setUsername(''); 
            }
        }; 
        checkLoggedInUser();
    }, []);

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
                    'http://127.0.0.1:8000/api/accounts/logout/', {"refresh": refreshToken}, config
                    )
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                setIsLoggedIn(false); 
                setUsername('');
            }
        } catch(err) {
            console.log("Failed to log out", error.response?.data || error.message) 
        }
    }

    const handleLogout2 = async () => {
        try{
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
    
          if(accessToken && refreshToken) {
            const config = {
              headers: {
                "Authorization":`Bearer ${accessToken}`
              }
            };
            await axios.post("http://127.0.0.1:8000/api/accounts/logout/", {"refresh":refreshToken}, config)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            setUsername("");
            console.log("Log out successful!")
          }
        }
        catch(error){
          console.error("Failed to logout", error.response?.data || error.message)
        }
      }
    console.log(`${username} is logged in: ${isLoggedIn}`);

    return (
        <div>
            {isLoggedIn ? (
                <>
                <h2>Hi, {username}. Thanks for logging in!</h2>
                <button onClick={handleLogout2}>Logout</button>
                </>
            ) : (
                <h2>Please log in</h2>
            )}
        </div>
    );
}
