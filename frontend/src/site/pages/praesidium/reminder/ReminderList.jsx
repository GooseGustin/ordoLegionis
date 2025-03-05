import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { NavLink, Link } from "react-router-dom";

const BASEURL = "http://localhost:8000/api/";

const ReminderList = () => {
    const reminders = useLoaderData();
    console.log('reminders', reminders);

    return (
        <div>

            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='../'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">Praesidium</span>
                    </NavLink>
                    <NavLink className="nav-link" to='create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">New reminder</span>
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

            {/* main  */}
            <main className="main-content">
                
                <div className="">
                    {reminders.map(item => {
                        return (
                            <div className="card my-2 border-0" key={item.id}>

                                <div className="card-header">
                                    <Link className='text-dark text-decoration-none' to={item.id.toString()}>
                                        <span className="text-info fs-6">Reminder </span>
                                    </Link>
                                </div>

                                <Link className='text-dark text-decoration-none' to={item.id.toString()}>
                                    <div className="card-body post rounded border border-3 border-dark">
                                        {item.content.slice(0, 120)}
                                        {item.content.length > 120 ? <>...</> : <></>}
                                    </div>
                                </Link>

                            </div>
                        );
                    }
                    )}
                </div>
            </main>
        </div>
    )
}

export default ReminderList

export const reminderListLoader = async ({ params }) => {
    const { pid } = params;
    let reminders;

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const reminderResponse = await axios.get(`${BASEURL}praesidium/reminders/?pid=${pid}`, config);
            reminders = reminderResponse.data;
        } else {
            console.log('Sign in to access reminders')
        }
    } catch (err) {
        console.log("Error", err)
    } finally {
        return reminders
    }

}